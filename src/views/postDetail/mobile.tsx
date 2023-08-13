import { Box, Avatar, Button, TextField } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

import { IPostDetailProps } from "../../interfaces";
import { Comment } from "../../types";
import NavigationBar from "../../components/navigationBar";
import AppBarPost from "../../components/appBarPost";

const MobileView: React.FC<IPostDetailProps> = ({
  isMobile,
  state,
  post,
  handleFollow,
  handleUnfollow,
  addLike,
  removeLike,
  getMoreComments,
  isShowMoreComments,
  handleText,
  text,
  addComment,
  onNavigate,
}) => {
  return (
    <Box
      style={{
        minHeight: "100vh",
        backgroundColor: "#F3F6F9",
        paddingBottom: 100,
      }}
    >
      <AppBarPost
        isMobile={isMobile}
        state={state}
        onCreatePost={console.log}
        page="details"
      />
      <Box>
        <Box
          style={{
            minHeight: post?.image !== "" ? "50vh" : "",
            display: "flex",
            justifyContent: "center",
            background: "#FFFFFF",
            padding: 8,
            flexDirection: "column",
          }}
        >
          <Box
            style={{
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={post?.user.avatar}
              onClick={() =>
                post && post.user?._id && onNavigate(post.user?._id, false)
              }
            />
            <Box style={{ marginLeft: 8 }}>
              <Box>{post?.user.username}</Box>
              {state.user?._id !== post?.user._id && (
                <Box>
                  {state.user?.follows.find(
                    (el: string) => el === post?.user._id
                  ) ? (
                    <Button
                      onClick={() => handleUnfollow()}
                      color="secondary"
                      variant="outlined"
                      style={{
                        color: "rgb(0 127 255 / 74%)",
                        width: 30,
                        height: 20,
                        fontSize: 14,
                        textTransform: "capitalize",
                        border: "1px solid rgb(0 127 255 / 74%)",
                      }}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleFollow()}
                      color="secondary"
                      disableElevation
                      variant="contained"
                      style={{
                        color: "#FFFFFF",
                        width: 30,
                        height: 20,
                        fontSize: 14,
                        textTransform: "capitalize",
                      }}
                    >
                      Follow
                    </Button>
                  )}
                </Box>
              )}
            </Box>
          </Box>
          {post?.description && post?.description}
          {post?.image !== "" && (
            <img src={post?.image} style={{ width: "100%" }} alt="" />
          )}
          <Box
            style={{
              marginTop: 4,
              marginBottom: 4,
              marginLeft: "auto",
              marginRight: 12,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>
              {post?.likes?.find((el: string) => el === state.user?._id) ? (
                <FavoriteIcon
                  onClick={() => post && removeLike(post._id, state.user?._id)}
                  style={{ marginBottom: -8, marginRight: 8 }}
                />
              ) : (
                <FavoriteBorderIcon
                  onClick={() => post && addLike(post._id, state.user?._id)}
                  style={{ marginBottom: -8, marginRight: 8 }}
                />
              )}
            </Box>
            <Box style={{ marginBottom: -8, marginRight: 8 }}>
              {post?.likes?.length}
            </Box>
            <ModeCommentOutlinedIcon style={{ marginBottom: -10 }} />
            <Box style={{ marginBottom: -8, marginLeft: 8 }}>
              {post?.totalComments}
            </Box>
          </Box>
          <Box style={{ marginTop: 8 }}>
            {post?.comments?.map((el: Comment, index: number) => (
              <>
                <Box
                  key={index}
                  style={{
                    paddingLeft: 8,
                    paddingRight: 8,
                    marginBottom: 8,
                    display: "flex",
                    // alignItems: "center",
                  }}
                >
                  <Box style={{ marginRight: 8 }}>
                    <Avatar
                      src={el.user.avatar}
                      onClick={() =>
                        el && el.user._id && onNavigate(el.user?._id, false)
                      }
                    />
                  </Box>
                  <Box style={{ width: "100%" }}>
                    <Box style={{ fontWeight: 600, fontSize: 14 }}>
                      {el.user.username}
                    </Box>
                    <Box style={{ wordBreak: "break-word", fontSize: 12 }}>
                      {el.content.text}
                    </Box>
                  </Box>
                </Box>
              </>
            ))}
            {isShowMoreComments && (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "end",
                  color: "#757575",
                  paddingRight: 16,
                  textDecoration: "underline",
                }}
                onClick={() => getMoreComments()}
              >
                Read more
              </Box>
            )}
            <Box
              style={{
                paddingLeft: 8,
                paddingRight: 8,
                display: "flex",
                marginTop: 16,
              }}
            >
              <Box style={{ marginRight: 8 }}>
                <Avatar src={state.user?.avatar} />
              </Box>
              <Box style={{ width: "100%" }}>
                <TextField
                  multiline
                  minRows={2}
                  maxRows={3}
                  variant="outlined"
                  fullWidth
                  placeholder="Write your comment here"
                  value={text}
                  onChange={(e) => handleText(e.target.value)}
                />
              </Box>
            </Box>
            <Box
              style={{
                marginTop: 8,
                display: "flex",
                justifyContent: "end",
                paddingLeft: 8,
                paddingRight: 8,
              }}
            >
              <Button
                onClick={() => addComment(true, "", text)}
                color="secondary"
                disableElevation
                variant="contained"
                style={{
                  textTransform: "initial",
                  color: "#FFFFFF",
                }}
              >
                Publish a comment
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <NavigationBar isMobile={isMobile} state={state} />
    </Box>
  );
};

export default MobileView;
