import { useState, useContext, useEffect, useRef } from "react";

import { IGlobarProps } from "../interfaces";
import DesktopView from "../views/home/desktop";
import MobileView from "../views/home/mobile";
import { AppContext } from "../context";
import { NavigateFunction, useNavigate } from "react-router-dom";
import myAppApi from "../api";
import Swal from "sweetalert2";
import { Post, Comment } from "../types";
import { Backdrop, Box, CircularProgress } from "@mui/material";

const Home: React.FC<IGlobarProps> = ({ isMobile }) => {
  const { state, handlePage, handleLoading } = useContext(AppContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<undefined | Post>(undefined);
  const [text, setText] = useState<string>("");
  const [isShowMoreComments, setIsShowMoreComments] = useState<boolean>(false);
  const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);
  const [isNext, setIsNext] = useState<boolean>(false);
  const containerRef = useRef<HTMLElement | null>(null);

  const navigate: NavigateFunction = useNavigate();

  const handleSelectedPost = (post: Post) => {
    setSelectedPost(post);
    if (post.comments?.length === 3) setIsShowMoreComments(true);
  };

  const handleText = (currentText: string) => setText(currentText);
  const getPosts = async (): Promise<void> => {
    if (posts.length === 0) handleLoading(true);

    try {
      const response = (await myAppApi.get(`/posts/home/list/${posts.length}`))
        .data;

      const homePosts: Post[] = response.posts;

      setPosts(homePosts);
      setIsNext(response.isNext);
    } catch (err) {
      console.log(err);
    }
    handleLoading(false);
  };

  const getMoreComments = async (): Promise<void> => {
    try {
      if (selectedPost) {
        console.log({
          postId: selectedPost._id,
          skip: selectedPost?.comments?.length,
        });
        const { post, isNext } = (
          await myAppApi.post("/comments/more", {
            postId: selectedPost._id,
            skip: selectedPost?.comments?.length,
          })
        ).data;
        const newPosts: Post[] = [...posts];

        const index = newPosts.findIndex((el: Post) => el._id === post._id);
        if (index !== undefined) {
          post.comments.forEach((el: Comment) =>
            newPosts[index].comments?.push(el)
          );
        }
        setIsShowMoreComments(isNext);
        setPosts(newPosts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async (
    isPost: boolean = true,
    image: string = "",
    text: string = ""
  ): Promise<void> => {
    handleLoading(true);
    try {
      const { post } = (
        await myAppApi.post("/comments", {
          isPost,
          image,
          text,
          postId: selectedPost?._id,
          commentId: undefined,
        })
      ).data;
      const newPosts: Post[] = [...posts];

      const index = newPosts.findIndex((el: Post) => el._id === post._id);
      if (index !== undefined) newPosts.splice(index, 1, post);
      setPosts(newPosts);
      setText("");
    } catch (err) {
      console.log(err);
    }
    handleLoading(false);
  };

  const addLike = async (
    _id: string,
    userId: string | undefined
  ): Promise<void> => {
    try {
      const { post } = (
        await myAppApi.put("/posts/add/like", {
          _id,
          userId,
        })
      ).data;
      const newPosts: Post[] = [...posts];
      const index = newPosts.findIndex((el: Post) => el._id === post._id);
      if (index !== undefined) newPosts.splice(index, 1, post);
      setPosts(newPosts);
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: "Error add like post",
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  const removeLike = async (
    _id: string,
    userId: string | undefined
  ): Promise<void> => {
    try {
      const { post } = (
        await myAppApi.put("/posts/remove/like", {
          _id,
          userId,
        })
      ).data;
      const newPosts: Post[] = [...posts];
      const index = newPosts.findIndex((el: Post) => el._id === post._id);
      if (index !== undefined) newPosts.splice(index, 1, post);
      setPosts(newPosts);
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: "Error add like post",
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  const onNavigate = (id: string | undefined, isPost: boolean = false) => {
    if (isPost) {
      navigate(`/posts/${id}`);
    } else {
      id === state.user?._id
        ? navigate(`/profile`)
        : navigate(`/profile/${id}`);
    }
  };

  useEffect(() => {
    handlePage("home");
  }, []);

  useEffect(() => {
    if (!state.isLogged) navigate("/");
  }, []);

  useEffect(() => {
    const options = {
      root: null, // El contenedor raíz es el viewport
      rootMargin: "0px",
      threshold: 1.0, // 100% de intersección necesaria
    };

    const callback = (entries: any, observer: any) => {
      entries.forEach(async (entry: any) => {
        if (entry.isIntersecting) {
          if (isNext) {
            setIsLoadingPost(true);
            const response = (
              await myAppApi.get(`/posts/home/list/${posts.length}`)
            ).data;
            console.log(response);
            const currentPosts: Post[] = posts;
            response.posts.forEach((el: Post) => currentPosts.push(el));
            setIsNext(response.isNext);
            setPosts(currentPosts);
            setIsLoadingPost(false);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (containerRef && containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [posts, isNext]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Box>
      {isMobile ? (
        <MobileView
          state={state}
          isMobile={isMobile}
          posts={posts}
          addLike={addLike}
          removeLike={removeLike}
          onNavigate={onNavigate}
          handleSelectedPost={handleSelectedPost}
          selectedPost={selectedPost}
          addComment={addComment}
          text={text}
          handleText={handleText}
          getMoreComments={getMoreComments}
          isShowMoreComments={isShowMoreComments}
          isLoadingPost={isLoadingPost}
        />
      ) : (
        <DesktopView
          state={state}
          isMobile={isMobile}
          posts={posts}
          addLike={addLike}
          removeLike={removeLike}
          onNavigate={onNavigate}
          handleSelectedPost={handleSelectedPost}
          selectedPost={selectedPost}
          addComment={addComment}
          text={text}
          handleText={handleText}
          getMoreComments={getMoreComments}
          isShowMoreComments={isShowMoreComments}
          isLoadingPost={isLoadingPost}
        />
      )}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box ref={containerRef}></Box>
    </Box>
  );
};

export default Home;
