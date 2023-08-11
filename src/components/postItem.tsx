import { Avatar, Box, Button, Paper, TextField } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { IPostItemProps } from "../interfaces";
import { Comment } from "../types";

const PostItem: React.FC<IPostItemProps> = ({
  post,
  onNavigate,
  state,
  removeLike,
  addLike,
  selectedPost,
  handleSelectedPost,
  addComment,
  text,
  handleText,
  getMoreComments,
  isShowMoreComments,
  page,
}) => {
  return (
    <Paper
      elevation={1}
      key={post._id}
      style={{
        borderEndStartRadius: page !== "feed" ? 8 : 0,
        borderEndEndRadius: page !== "feed" ? 8 : 0,
        marginBottom: page !== "feed" ? 8 : 0,
      }}
    >
      <Box
        style={{
          minHeight: 60,
          padding: 4,
        }}
        onClick={() => onNavigate(post._id, true)}
      >
        <Box
          style={{
            marginBottom: 8,
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 8,
          }}
        >
          {post.description}
        </Box>
        <Box>
          {post.image && (
            <img src={post.image} alt="" style={{ width: "100%" }} />
          )}
        </Box>
      </Box>

      <Box
        style={{
          borderEndStartRadius: 8,
          borderEndEndRadius: 8,
          padding: 4,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box>
          <Avatar
            style={{
              width: page === "feed" ? 24 : 36,
              height: page === "feed" ? 24 : 36,
            }}
            src={post.user?.avatar ? post.user?.avatar : undefined}
            onClick={() => post.user?._id && onNavigate(post.user?._id, false)}
          />
        </Box>
        <Box style={{ marginLeft: 8 }}>
          <Box
            style={{ fontWeight: "bold", fontSize: page === "feed" ? 12 : 16 }}
          >
            {post.user?.username}
          </Box>
          <Box style={{ fontSize: 12 }}>
            {/* {post.user._id !== state.user?._id && "Boton"} */}
          </Box>
        </Box>
        {page !== "feed" && (
          <Box
            style={{
              marginLeft: "auto",
              marginRight: 12,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>
              {post.likes?.find((el: string) => el === state.user?._id) ? (
                <FavoriteIcon
                  onClick={() => removeLike(post._id, state.user?._id)}
                  fontSize="small"
                  style={{ marginBottom: -8, marginRight: 8 }}
                />
              ) : (
                <FavoriteBorderIcon
                  onClick={() => addLike(post._id, state.user?._id)}
                  fontSize="small"
                  style={{ marginBottom: -8, marginRight: 8 }}
                />
              )}
            </Box>
            <Box style={{ marginBottom: -8, marginRight: 8 }}>
              {post.likes?.length}
            </Box>
            <ModeCommentOutlinedIcon
              onClick={() => handleSelectedPost(post)}
              fontSize="small"
              style={{ marginBottom: -10 }}
            />
          </Box>
        )}
        {page !== "feed" && (
          <Box style={{ marginBottom: -8, marginRight: 8 }}>
            {post.totalComments}
            {/* {post?.comments ? post?.comments.length : 0} */}
          </Box>
        )}
      </Box>
      {selectedPost && selectedPost._id === post._id && (
        <Box style={{ paddingTop: 10, paddingBottom: 10 }}>
          <hr />
          {post.comments?.map((el: Comment, index: number) => (
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
                      el.user && el.user._id && onNavigate(el?.user?._id, false)
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
      )}
      {/* {isShowComment === post._id && <Box>Epale manao</Box>} */}
      <Box></Box>
    </Paper>
  );
};

export default PostItem;
