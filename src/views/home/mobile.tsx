import { Box, CircularProgress } from "@mui/material";

import { IHomeProps } from "../../interfaces";
import AppBar from "../../components/appBar";
import NavigationBar from "../../components/navigationBar";
import { Post } from "../../types";
import PostItem from "../../components/postItem";

const MobileView: React.FC<IHomeProps> = ({
  isMobile,
  state,
  posts,
  addLike,
  removeLike,
  onNavigate,
  handleSelectedPost,
  selectedPost,
  addComment,
  text,
  handleText,
  getMoreComments,
  isShowMoreComments,
  isLoadingPost,
}) => {
  return (
    <Box
      style={{
        minHeight: "100vh",
        backgroundColor: "#F3F6F9",
      }}
    >
      <AppBar isMobile={isMobile} state={state} />
      <Box
        style={{
          paddingTop: 8,
          paddingBottom: 100,
          paddingLeft: 8,
          paddingRight: 8,
        }}
      >
        {posts?.map((el: Post) => (
          <PostItem
            post={el}
            addLike={addLike}
            onNavigate={onNavigate}
            removeLike={removeLike}
            state={state}
            key={el._id}
            handleSelectedPost={handleSelectedPost}
            selectedPost={selectedPost}
            addComment={addComment}
            text={text}
            handleText={handleText}
            getMoreComments={getMoreComments}
            isShowMoreComments={isShowMoreComments}
            page="home"
          />
        ))}
        {isLoadingPost && (
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress color="secondary" />
          </Box>
        )}
      </Box>

      <NavigationBar isMobile={isMobile} state={state} />
    </Box>
  );
};

export default MobileView;
