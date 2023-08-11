import { Box, Paper } from "@mui/material";
import { Masonry } from "@mui/lab";

import AppBar from "../../components/appBar";
import NavigationBar from "../../components/navigationBar";
import UserListItem from "../../components/usersListItem";
import { IFeedProps } from "../../interfaces";
import { Post, User } from "../../types";

import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";
import image5 from "../../assets/image5.png";
import PostItem from "../../components/postItem";

const MobileView: React.FC<IFeedProps> = ({
  isMobile,
  state,
  goToProfile,
  handleFollow,
  handleUnfollow,
  onNavigate,
  posts,
}) => {
  return (
    <Box
      style={{
        height: "100vh",
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
      </Box>
      <NavigationBar isMobile={isMobile} state={state} />
    </Box>
  );
};

export default MobileView;
