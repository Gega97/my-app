import { Box, Avatar, IconButton, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import { IProfileProps } from "../../interfaces";
import AppBar from "../../components/appBar";
import NavigationBar from "../../components/navigationBar";
import UserForm from "../../components/userForm";
import { Post, User } from "../../types";

import PostItem from "../../components/postItem";

const MobileView: React.FC<IProfileProps> = ({
  isMobile,
  state,
  onEditProfile,
  isEditProfile,
  updateUser,
  isGuess,
  isGuessUser,
  handleFollow,
  handleUnfollow,
  posts,
  addLike,
  removeLike,
  handleSelectedPost,
  selectedPost,
  getMoreComments,
  handleText,
  isShowMoreComments,
  onNavigate,
  text,
  addComment,
  totalPosts,
  isLoadingPost,
}) => {
  const user: User | null = isGuess ? isGuessUser : state.user;

  return (
    <Box
      style={{
        minHeight: "100vh",
        paddingBottom: 80,
      }}
    >
      <AppBar isMobile={isMobile} state={state} />
      {!isEditProfile ? (
        <Box>
          <Box
            style={{
              height: 150,
              width: "100%",
              background: "rgb(0 127 255 / 74%)",
              position: "relative",
            }}
          >
            <Box style={{ position: "absolute", bottom: -50, left: 25 }}>
              <Avatar
                style={{ width: 100, height: 100 }}
                src={user?.avatar ? user.avatar : undefined}
              />
            </Box>
          </Box>
          <Box style={{ background: "#FFFFFF" }}>
            <Box style={{ display: "flex", marginRight: 8 }}>
              <Box style={{ marginLeft: "auto" }}>
                <IconButton
                  onClick={() => {
                    if (isGuess) {
                      if (
                        state.user?.follows.find(
                          (el: string) => el === user?._id
                        )
                      ) {
                        if (user) {
                          handleUnfollow(user?._id || "");
                        }
                      } else {
                        if (user) {
                          handleFollow(user?._id || "");
                        }
                      }
                    } else {
                      onEditProfile(true);
                    }
                  }}
                >
                  {isGuess ? (
                    state.user?.follows.find(
                      (el: string) => el === user?._id
                    ) ? (
                      <PersonRemoveIcon />
                    ) : (
                      <PersonAddIcon />
                    )
                  ) : (
                    <EditIcon />
                  )}
                </IconButton>
              </Box>
            </Box>

            <Box style={{ padding: 16 }}>
              <Box style={{ fontSize: 18, fontWeight: 700 }}>
                {user?.username}
              </Box>
              <Box
                style={{
                  color: "#757575",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.email}
              </Box>
              <Box
                style={{
                  color: "#757575",
                  wordBreak: "break-word",
                }}
              >
                {user?.description}
              </Box>
              <Box
                style={{
                  marginTop: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Box style={{ textAlign: "center" }}>
                  <Box>Posts</Box>
                  <Box style={{ fontWeight: "bold" }}>{totalPosts}</Box>
                </Box>
                <Box style={{ textAlign: "center" }}>
                  <Box>Followers</Box>
                  <Box style={{ fontWeight: "bold" }}>
                    {user?.followers.length}
                  </Box>
                </Box>
                <Box style={{ textAlign: "center" }}>
                  <Box>Follows</Box>
                  <Box style={{ fontWeight: "bold" }}>
                    {user?.follows.length}
                  </Box>
                </Box>
              </Box>

              <Box style={{ marginTop: 16 }}>
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
                    page="profile"
                  />
                ))}
                {isLoadingPost && (
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress color="secondary" />
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <UserForm
          state={state}
          isMobile={isMobile}
          onCancel={() => onEditProfile(false)}
          onSave={updateUser}
        />
      )}

      <NavigationBar isMobile={isMobile} state={state} />
    </Box>
  );
};

export default MobileView;
