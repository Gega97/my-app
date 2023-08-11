import { useState, useEffect, useContext } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { IGlobarProps } from "../interfaces";
import DesktopView from "../views/postDetail/desktop";
import MobileView from "../views/postDetail/mobile";
import { AppContext } from "../context";
import { Comment, Post } from "../types";
import myAppApi from "../api";
import Swal from "sweetalert2";

const PostDetail: React.FC<IGlobarProps> = ({ isMobile }) => {
  const { state, updateUser, handleLoading } = useContext(AppContext);
  const [post, setPost] = useState<Post | undefined>();
  const [text, setText] = useState<string>("");

  const [isShowMoreComments, setIsShowMoreComments] = useState<boolean>(false);
  const navigate = useNavigate();
  const params: Params = useParams();

  const getPost = async (): Promise<void> => {
    try {
      const { post } = (await myAppApi.get(`/posts/${params.id}`)).data;
      if (post.comments.length === 3) setIsShowMoreComments(true);
      else setIsShowMoreComments(false);
      setPost(post);
    } catch (err) {
      navigate(-1);
      console.log(err);
    }
  };
  const getMoreComments = async (): Promise<void> => {
    try {
      const response = (
        await myAppApi.post("/comments/more", {
          postId: post?._id,
          skip: post?.comments?.length,
        })
      ).data;
      if (response && response.post) {
        const currentPost: any = { ...post };
        response.post.comments.forEach((el: Comment) =>
          currentPost?.comments?.push(el)
        );

        setPost(currentPost);
        setIsShowMoreComments(response.isNext);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleText = (currentText: string) => setText(currentText);

  const addComment = async (
    isPost: boolean = true,
    image: string = "",
    text: string = ""
  ): Promise<void> => {
    handleLoading(true);
    try {
      const response = (
        await myAppApi.post("/comments", {
          isPost,
          image,
          text,
          postId: post?._id,
          commentId: undefined,
        })
      ).data;

      if (response && response.post) {
        setPost(response.post);
        setText("");
      }
    } catch (err) {
      console.log(err);
    }
    handleLoading(false);
  };

  const handleFollow = async (): Promise<void> => {
    try {
      const { user } = (
        await myAppApi.put("/users/add/follow", {
          _id: state?.user?._id,
          _idFollow: post?.user._id,
        })
      ).data;
      updateUser(user);
    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: "Error",
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  const handleUnfollow = async (): Promise<void> => {
    try {
      const { user } = (
        await myAppApi.put("/users/remove/follow", {
          _id: state?.user?._id,
          _idFollow: post?.user._id,
        })
      ).data;
      updateUser(user);
    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: "Error",
        icon: "error",
        showConfirmButton: false,
      });
    }
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
      setPost(post);
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
      setPost(post);
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

  useEffect(() => {
    if (!state.isLogged) navigate("/");
  }, []);

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileView
          state={state}
          isMobile={isMobile}
          post={post}
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
          addLike={addLike}
          removeLike={removeLike}
          getMoreComments={getMoreComments}
          isShowMoreComments={isShowMoreComments}
          text={text}
          handleText={handleText}
          addComment={addComment}
        />
      ) : (
        <DesktopView
          state={state}
          isMobile={isMobile}
          post={post}
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
          addLike={addLike}
          removeLike={removeLike}
          getMoreComments={getMoreComments}
          isShowMoreComments={isShowMoreComments}
          text={text}
          handleText={handleText}
          addComment={addComment}
        />
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default PostDetail;
