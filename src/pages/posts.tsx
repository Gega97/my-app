import { useState, useContext, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { IGlobarProps } from "../interfaces";
import DesktopView from "../views/posts/desktop";
import MobileView from "../views/posts/mobile";
import { AppContext } from "../context";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import myAppApi from "../api";

const Posts: React.FC<IGlobarProps> = ({ isMobile }) => {
  const [description, setDescription] = useState("");
  const [file, setFileUpload] = useState<any>(undefined);
  const { state, handlePage, handleLoading } = useContext(AppContext);
  const navigate: NavigateFunction = useNavigate();

  const onCreatePost = async (): Promise<void> => {
    handleLoading(true);

    try {
      const formData = new FormData();
      if (state?.user?._id) formData.append("_id", state.user._id);
      formData.append("description", description);
      formData.append("file", file);
      const newPost = await myAppApi.post("/posts", formData);
      navigate(-1);
      console.log(newPost);
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: "Error create post",
        icon: "error",
        showConfirmButton: false,
      });
    }
    handleLoading(false);
  };

  const setFile = (file: any) => {
    setFileUpload(file);
  };

  const handleDescription = (value: string) => {
    setDescription(value);
  };

  useEffect(() => {
    handlePage("posts");
  }, []);

  useEffect(() => {
    if (!state.isLogged) navigate("/");
  }, []);
  return (
    <>
      {isMobile ? (
        <MobileView
          state={state}
          isMobile={isMobile}
          onCreatePost={onCreatePost}
          file={file}
          setFile={setFile}
          description={description}
          handleDescription={handleDescription}
        />
      ) : (
        <DesktopView
          state={state}
          isMobile={isMobile}
          onCreatePost={onCreatePost}
          file={file}
          setFile={setFile}
          description={description}
          handleDescription={handleDescription}
        />
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Posts;
