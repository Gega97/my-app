import { Box, Paper, Avatar, Button } from "@mui/material";

import { IUserList } from "../interfaces";

const UserListItem: React.FC<IUserList> = ({
  isMobile,
  user,
  handleFollow,
  handleUnfollow,
  isFollow,
  goToProfile,
}) => {
  return isMobile ? (
    <Paper elevation={1} style={{ padding: 12, marginBottom: 8 }}>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Box onClick={() => goToProfile(user.username)}>
          <Avatar />
        </Box>
        <Box style={{ marginLeft: 8 }}>
          <Box>{user.username}</Box>
          <Box>{user.email}</Box>
        </Box>
        <Box style={{ marginLeft: "auto" }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() =>
              isFollow
                ? handleUnfollow(user.username)
                : handleFollow(user.username)
            }
          >
            {isFollow ? "Unfollow" : "Follow"}
          </Button>
        </Box>
      </Box>
    </Paper>
  ) : (
    <>UserListDesktop</>
  );
};

export default UserListItem;
