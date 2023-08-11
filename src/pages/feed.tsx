import { useContext, useEffect, useState } from "react";

import { IGlobarProps } from "../interfaces";
import DesktopView from "../views/feed/desktop";
import MobileView from "../views/feed/mobile";
import { AppContext } from "../context";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import myAppApi from "../api";
import { Post } from "../types";

const Feed: React.FC<IGlobarProps> = ({ isMobile }) => {
  const { state, handlePage, handleFollow, handleUnfollow, handleLoading } =
    useContext(AppContext);
  const navigate: NavigateFunction = useNavigate();
  const [posts, setPosts] = useState<Post[]>();

  const goToProfile = (username: string): void =>
    navigate(`/profile/${username}`);

  const getPosts = async (): Promise<void> => {
    handleLoading(true);
    try {
      const { posts } = (await myAppApi.get("/posts/feed/list")).data;
      console.log(posts);
      const feedPosts: Post[] = posts;
      setPosts(feedPosts);
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
    getPosts();
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileView
          state={state}
          isMobile={isMobile}
          goToProfile={goToProfile}
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
          posts={posts}
          onNavigate={onNavigate}
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

export default Feed;
