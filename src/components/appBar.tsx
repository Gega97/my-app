import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CommentIcon from "@mui/icons-material/Comment";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { IAppBar } from "../interfaces";
import {
  NavigateFunction,
  NavigateOptions,
  useNavigate,
} from "react-router-dom";

const AppBar: React.FC<IAppBar> = ({ state, isMobile }) => {
  const { page } = state;

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
        {page === "profile" ? (
          <IconButton
            style={{ width: 28, height: 28 }}
            onClick={() => onNavigate(-1)}
          >
            <ArrowBackIcon style={{ width: 28, height: 28 }} />
          </IconButton>
        ) : (
          <Avatar
            onClick={() => onNavigate("/profile")}
            src={state.user?.avatar ? state.user?.avatar : undefined}
          />
        )}
      </Box>
      <Box style={{ width: "80%", marginRight: 8 }}>
        <TextField
          placeholder="Search..."
          fullWidth
          InputProps={{
            style: {
              height: 40,
              backgroundColor: "#F3F6F9",
              border: "none !important",
            },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{
            border: "none !important",
          }}
        />
      </Box>
      <Box style={{ marginLeft: "auto", width: "10%" }}>
        <IconButton style={{ width: 28, height: 28 }}>
          {page === "profile" ? (
            <SettingsIcon style={{ width: 28, height: 28 }} />
          ) : (
            <CommentIcon style={{ width: 28, height: 28 }} />
          )}
        </IconButton>
      </Box>
    </Box>
  ) : (
    <>Desktop appBar</>
  );
};

export default AppBar;
