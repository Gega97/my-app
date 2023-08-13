import { useContext, useEffect, useState, useRef } from "react";

import { IGlobarProps } from "../interfaces";
import DesktopView from "../views/feed/desktop";
import MobileView from "../views/feed/mobile";
import { AppContext } from "../context";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import myAppApi from "../api";
import { Post } from "../types";

const Feed: React.FC<IGlobarProps> = ({ isMobile }) => {
  const { state, handlePage, handleFollow, handleUnfollow, handleLoading } =
    useContext(AppContext);
  const navigate: NavigateFunction = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);
  const [isNext, setIsNext] = useState<boolean>(false);

  const containerRef = useRef<HTMLElement | null>(null);

  const goToProfile = (username: string): void =>
    navigate(`/profile/${username}`);

  const getPosts = async (): Promise<void> => {
    if (posts.length === 0) handleLoading(true);
    try {
      const response = (await myAppApi.get(`/posts/feed/list/${posts.length}`))
        .data;
      console.log(response);
      const feedPosts: Post[] = response.posts;
      setPosts(feedPosts);
      setIsNext(response.isNext);
    } catch (err) {
      console.log(err);
    }
    handleLoading(false);
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
    handlePage("feed");
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
          console.log("El box ya se muestra");
          if (isNext) {
            setIsLoadingPost(true);
            const response = (
              await myAppApi.get(`/posts/feed/list/${posts.length}`)
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
          goToProfile={goToProfile}
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
          posts={posts}
          onNavigate={onNavigate}
          isLoadingPost={isLoadingPost}
        />
      ) : (
        <DesktopView
          state={state}
          isMobile={isMobile}
          goToProfile={goToProfile}
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
          posts={posts}
          onNavigate={onNavigate}
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

export default Feed;
