import React, { useState, useRef } from "react";
import { Box, IconButton, Dialog, Slide } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { TransitionProps } from "@mui/material/transitions";

import { IAppBar } from "../interfaces";
import { NavigateFunction, useNavigate } from "react-router-dom";
import PostForm from "./postForm";
import { convertToBase64 } from "../service";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NavigationBar: React.FC<IAppBar> = ({ state }) => {
  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [image, setImage] = useState<string>("");
  const inputFile = useRef<HTMLInputElement>(null);
  const { page } = state;
  const navigate: NavigateFunction = useNavigate();
  const onNavigate = (path: string): void => navigate(path);

  const handleOpenDialog = (value: boolean) => {
    setOpenFormDialog(value);
    if (value === false && inputFile.current) {
      inputFile.current.value = "";
    }
  };

  const handleChange = async (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    const resizedString: any = await convertToBase64(file);
    setImage(resizedString);
    handleOpenDialog(true);
  };

  return (
    <Box
      style={{
        height: 90,
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        paddingLeft: 8,
        paddingRight: 8,
        position: "fixed",
        bottom: 0,
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <IconButton onClick={() => onNavigate("/home")}>
          <HomeIcon
            fontSize="large"
            style={{
              color: page === "home" ? "rgb(0 127 255 / 74%)" : "#757575  ",
            }}
          />
        </IconButton>
      </Box>
      <Box>
        <IconButton onClick={() => onNavigate("/feed")}>
          <PeopleIcon
            fontSize="large"
            style={{
              color: page === "feed" ? "rgb(0 127 255 / 74%)" : "#757575  ",
            }}
          />
        </IconButton>
      </Box>
      <Box>
        <IconButton component="label" onClick={() => onNavigate("/posts")}>
          <AddCircleOutlineIcon
            fontSize="large"
            style={{
              color: page === "posts" ? "rgb(0 127 255 / 74%)" : "#757575  ",
            }}
          />
          {/* <input
            ref={inputFile}
            hidden
            type="file"
            onChange={(e: any) => {
              if (e.target.value) {
                handleChange(e);
              }
            }}
          /> */}
        </IconButton>
      </Box>
      <Box>
        <IconButton onClick={() => onNavigate("/notification")}>
          <NotificationsIcon
            fontSize="large"
            style={{
              color:
                page === "notification" ? "rgb(0 127 255 / 74%)" : "#757575  ",
            }}
          />
        </IconButton>
      </Box>
      <Box>
        <IconButton onClick={() => onNavigate("/settings")}>
          <HomeRepairServiceIcon
            fontSize="large"
            style={{
              color: page === "settings" ? "rgb(0 127 255 / 74%)" : "#757575  ",
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NavigationBar;
