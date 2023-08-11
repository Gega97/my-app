import { useState, useRef } from "react";
import { Box, TextField, Avatar, Button } from "@mui/material";
// import { readAndCompressImage } from "browser-image-resizer";

import { IUserForm } from "../interfaces";
import { convertToBase64 } from "../service";

const UserForm: React.FC<IUserForm> = ({
  isMobile,
  state,
  onCancel,
  onSave,
}) => {
  const [username, setUsername] = useState<string>(state.user?.username || "");
  const [name, setName] = useState<string>(state.user?.name || "");
  const [lastName, setLastname] = useState<string>(state.user?.lastname || "");
  const [description, setDescription] = useState<string>(
    state.user?.description || ""
  );
  const [email, setEmail] = useState<string>(state.user?.email || "");
  const [avatar, setAvatar] = useState<string | undefined>(
    state.user?.avatar ? state.user.avatar : undefined
  );
  const [file, setFile] = useState<any>(null);
  const inputRef = useRef(null);

  const handleChange = async (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    const resizedString: any = await convertToBase64(file);
    setAvatar(resizedString);
  };

  return (
    <>
      <Box
        style={{
          height: 150,
          width: "100%",
          background: "rgb(0 127 255 / 74%)",
          position: "relative",
        }}
      >
        <Box
          component="label"
          style={{ position: "absolute", bottom: -50, left: 25 }}
        >
          <Avatar style={{ width: 100, height: 100 }} src={avatar} />

          <input type="file" ref={inputRef} hidden onChange={handleChange} />
        </Box>
      </Box>
      <Box
        style={{ padding: "62px 8px 100px 8px", backgroundColor: "#FFFFFF" }}
      >
        <Box style={{ marginBottom: 12 }}>
          <TextField
            fullWidth={isMobile}
            required
            id="outlined-required"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Box>
        <Box style={{ marginBottom: 12 }}>
          <TextField
            fullWidth={isMobile}
            id="outlined-required"
            label="Firstname"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Box>
        <Box style={{ marginBottom: 12 }}>
          <TextField
            fullWidth={isMobile}
            id="outlined-required"
            label="Lastname"
            variant="outlined"
            value={lastName}
            onChange={(event) => setLastname(event.target.value)}
          />
        </Box>
        <Box style={{ marginBottom: 12 }}>
          <TextField
            fullWidth={isMobile}
            id="outlined-required"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Box>
        <Box style={{ marginBottom: 12 }}>
          <TextField
            fullWidth={isMobile}
            multiline
            rows={2}
            required
            id="outlined-required"
            label="Description"
            variant="outlined"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Button
            onClick={() => onCancel()}
            variant="outlined"
            color="primary"
            style={{ marginRight: 12 }}
          >
            Cancel
          </Button>
          <Button
            onClick={() =>
              onSave(username, email, name, lastName, description, file)
            }
            variant="contained"
            color="secondary"
            disableElevation
            style={{ color: "#FFFFFF" }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UserForm;
