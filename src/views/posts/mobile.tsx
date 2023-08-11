import { Box } from "@mui/material";
import { IPostProps } from "../../interfaces";
import NavigationBar from "../../components/navigationBar";
import AppBarPost from "../../components/appBarPost";

import PostForm from "../../components/postForm";

const MobileView: React.FC<IPostProps> = ({
  isMobile,
  state,
  file,
  setFile,
  description,
  handleDescription,
  onCreatePost,
}) => {
  return (
    <Box
      style={{
        height: "100vh",
        backgroundColor: "#F3F6F9",
      }}
    >
      <AppBarPost
        isMobile={isMobile}
        state={state}
        onCreatePost={onCreatePost}
        page="create"
      />
      <Box
        style={{
          width: "100%",
          height: "100%",
          background: "#F3F6F9",
          padding: 12,
        }}
      >
        <PostForm
          state={state}
          isMobile={isMobile}
          image=""
          file={file}
          setFile={setFile}
          description={description}
          handleDescription={handleDescription}
        />
      </Box>
      {/* <Box
        component="label"
        id="upload"
        style={{ position: "absolute", bottom: -50, left: 25 }}
      >
        <input type="file" hidden />
      </Box> */}
      <NavigationBar isMobile={isMobile} state={state} />
    </Box>
  );
};

export default MobileView;
