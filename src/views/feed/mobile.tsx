import { Box, CircularProgress } from "@mui/material";
import { Masonry } from "@mui/lab";

import AppBar from "../../components/appBar";
import NavigationBar from "../../components/navigationBar";
import { IFeedProps } from "../../interfaces";
import { Post } from "../../types";

import PostItem from "../../components/postItem";

const MobileView: React.FC<IFeedProps> = ({
  isMobile,
  state,
  onNavigate,
  posts,
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
      <Box style={{ paddingBottom: 100, paddingTop: 8 }}>
        {posts && (
          <Masonry
            columns={2}
            spacing={1}
            style={{ paddingLeft: 12, paddingRight: 4 }}
          >
            {posts.map((post: Post, index: number) => (
              <PostItem
                post={post}
                addLike={console.log}
                onNavigate={onNavigate}
                removeLike={console.log}
                state={state}
                key={post._id}
                handleSelectedPost={console.log}
                selectedPost={undefined}
                addComment={console.log}
                text={""}
                handleText={console.log}
                getMoreComments={console.log}
                isShowMoreComments={false}
                page="feed"
              />
            ))}
          </Masonry>
        )}
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
