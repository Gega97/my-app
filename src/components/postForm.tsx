import { useState, useRef } from "react";
import { Box, TextField, Avatar } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { IPostForm } from "../interfaces";
import { convertToBase64 } from "../service";

const PostForm: React.FC<IPostForm> = ({
  isMobile,
  state,
  setFile,
  description,
  handleDescription,
}) => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const inputRef = useRef(null);

  const handleChange = async (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    const resizedString: any = await convertToBase64(file);
    setImage(resizedString);
  };

  return (
    <>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src={state.user?.avatar ? state.user?.avatar : undefined}
          style={{ width: 60, height: 60 }}
        />
        <Box style={{ marginLeft: 8, fontSize: 18, fontWeight: 500 }}>
          {state.user?.username}
        </Box>
        <Box style={{ marginLeft: "auto" }} component="label">
          {/* <IconButton> */}
          <AddPhotoAlternateIcon color="secondary" fontSize="large" />
          {/* </IconButton> */}
          <input type="file" hidden onChange={handleChange} />
        </Box>
      </Box>
      <Box style={{ marginTop: 12 }}>
        <TextField
          value={description}
          onChange={(e) => handleDescription(e.target.value)}
          fullWidth
          label="tell us about yourself"
          multiline
          rows={4}
          variant="filled"
        />
      </Box>
      <Box style={{ marginTop: 18, paddingBottom: 100 }}>
        {image && <img src={image} ref={inputRef} style={{ width: "100%" }} />}
      </Box>
    </>
  );
};

export default PostForm;
