import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CommentIcon from "@mui/icons-material/Comment";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { IAppBarPost } from "../interfaces";
import {
  NavigateFunction,
  NavigateOptions,
  useNavigate,
} from "react-router-dom";

const AppBarPost: React.FC<IAppBarPost> = ({
  state,
  isMobile,
  onCreatePost,
  page,
}) => {
  const navigate: NavigateFunction = useNavigate();
  const onNavigate = (path: string | number): void => {
    if (typeof path === "string") {
      navigate(path, {} as NavigateOptions);
    } else {
      navigate(path);
    }
  };

  return isMobile ? (
    <Box
      style={{
        height: 75,
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        paddingLeft: 8,
        paddingRight: 8,
      }}
    >
      <Box style={{ width: "10%", marginRight: 8 }}>
        <IconButton
          style={{ width: 28, height: 28 }}
          onClick={() => onNavigate(-1)}
        >
          <ArrowBackIcon style={{ width: 28, height: 28 }} />
        </IconButton>
      </Box>
      <Box style={{ width: "70%", marginRight: 8 }}>
        {page === "create" ? "Add post" : "Post"}
      </Box>
      {page === "create" && (
        <Box style={{ marginLeft: "auto", width: "20%", marginRight: 8 }}>
          <Button
            onClick={() => onCreatePost()}
            variant="contained"
            color="secondary"
            style={{ color: "#FFFFFF", textTransform: "capitalize" }}
            size="medium"
            disableElevation
          >
            Publish
          </Button>
        </Box>
      )}
    </Box>
  ) : (
    <>Desktop appBar</>
  );
};

export default AppBarPost;
