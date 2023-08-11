import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { IGlobarProps } from "../interfaces";
import DesktopView from "../views/profile/desktop";
import MobileView from "../views/profile/mobile";
import { AppContext } from "../context";
import {
  NavigateFunction,
  useNavigate,
  Params,
  useParams,
} from "react-router-dom";
import myAppApi from "../api";
import { Comment, Post, User } from "../types";

const Profile: React.FC<IGlobarProps> = ({ isMobile }) => {
  const { state, logout, handlePage, updateUser, handleLoading } =
    useContext(AppContext);
  const navigate: NavigateFunction = useNavigate();
  const params: Params = useParams();

  const [isEditProfile, setIsEditProfile] = useState<boolean>(false);
  const [isGuess, setIsGuess] = useState<any>(null);
  const [guessUser, setIsGuessUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<undefined | Post>(undefined);
  const [text, setText] = useState<string>("");
  const [isShowMoreComments, setIsShowMoreComments] = useState<boolean>(false);

  const handleSelectedPost = (post: Post) => {
    setSelectedPost(post);
    if (post.comments?.length === 3) setIsShowMoreComments(true);
  };
  const onEditProfile = (isEdit: boolean) => setIsEditProfile(isEdit);

  const handleText = (currentText: string) => setText(currentText);

  const onNavigate = (id: string | undefined, isPost: boolean = false) => {
    if (isPost) {
      navigate(`/posts/${id}`);
    } else {
      id === state.user?._id
        ? navigate(`/profile`)
        : navigate(`/profile/${id}`);
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

  const onUpdateUser = async (
    username: string,
    email: string,
    name: string,
    lastname: string,
    description: string,
    file: any
  ): Promise<void> => {
    handleLoading(true);

    try {
      if (state && state.user) {
        const formData = new FormData();
        if (state.user._id) formData.append("_id", state.user._id);

        formData.append("file", file);

        formData.append("username", username);
        formData.append("email", email);
        formData.append("lastname", lastname);
        formData.append("name", name);
        formData.append("description", description);

        const { user } = (await myAppApi.put("/users", formData)).data;

        updateUser(user);
        Swal.fire({
          title: "Success",
          text: "Profile updated successfully",
          icon: "success",
          showConfirmButton: false,
        })
          .then((): void => {
            setIsEditProfile(false);
          })
          .catch((err): void => {});
      } else {
        Swal.fire({
          title: "Error",
          text: "Error update profile",
          icon: "error",
          showConfirmButton: false,
        });
      }
    } catch (err: any) {
      console.log(err.response);
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

  const getProfile = async (): Promise<void> => {
    if (params.id) {
      try {
        const { user } = (await myAppApi.get(`/users/${params.id}`)).data;
        if (user._id === state.user?._id) {
          navigate("/profile");
        } else {
          setIsGuess(true);
          setIsGuessUser(user);
        }
      } catch (err: any) {
        navigate("/notfound");
        console.log(err.response);
      }
    } else {
      try {
        const { user } = (await myAppApi.get(`/users/${state.user?._id}`)).data;
        updateUser(user);

        setIsGuess(false);
      } catch (err: any) {
        navigate("/notfound");
        console.log(err.response);
      }
    }
  };

  const getMoreComments = async (): Promise<void> => {
    try {
      if (selectedPost) {
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

  const getPosts = async (): Promise<void> => {
    try {
      const { posts } = (
        await myAppApi.get(
          `/posts/user/${params.id ? params.id : state.user?._id}`
        )
      ).data;
      setPosts(posts);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async (): Promise<void> => {
    try {
      const { user, userToFollow } = (
        await myAppApi.put("/users/add/follow", {
          _id: state?.user?._id,
          _idFollow: guessUser?._id,
        })
      ).data;
      updateUser(user);
      setIsGuessUser(userToFollow);
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
      console.log({
        _id: state?.user?._id,
        _idFollow: guessUser?._id,
      });

      const { user, userRemoveFollow } = (
        await myAppApi.put("/users/remove/follow", {
          _id: state?.user?._id,
          _idFollow: guessUser?._id,
        })
      ).data;
      updateUser(user);
      setIsGuessUser(userRemoveFollow);
    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: "Error",
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  const getData = async (): Promise<void> => {
    handleLoading(true);
    await Promise.all([getProfile(), getPosts()]);
    handleLoading(false);
  };

  useEffect((): void => {
    handlePage("profile");
  }, []);

  useEffect((): void => {
    if (!state.isLogged) navigate("/");
  }, []);

  useEffect((): void => {
    getData();
  }, [params]);

  return (
    <>
      {isMobile ? (
        <MobileView
          logout={logout}
          state={state}
          isMobile={isMobile}
          isEditProfile={isEditProfile}
          onEditProfile={onEditProfile}
          updateUser={onUpdateUser}
          isGuess={isGuess}
          isGuessUser={guessUser}
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
          posts={posts}
          addLike={addLike}
          removeLike={removeLike}
          handleSelectedPost={handleSelectedPost}
          selectedPost={selectedPost}
          onNavigate={onNavigate}
          getMoreComments={getMoreComments}
          handleText={handleText}
          isShowMoreComments={isShowMoreComments}
          text={text}
          addComment={addComment}
        />
      ) : (
        <DesktopView
          logout={logout}
          state={state}
          isMobile={isMobile}
          isEditProfile={isEditProfile}
          onEditProfile={onEditProfile}
          updateUser={onUpdateUser}
          isGuess={isGuess}
          isGuessUser={guessUser}
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
          posts={posts}
          addLike={addLike}
          removeLike={removeLike}
          handleSelectedPost={handleSelectedPost}
          selectedPost={selectedPost}
          onNavigate={onNavigate}
          getMoreComments={getMoreComments}
          handleText={handleText}
          isShowMoreComments={isShowMoreComments}
          text={text}
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

export default Profile;
