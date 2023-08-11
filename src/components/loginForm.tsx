import { useState } from "react";
import { Box, TextField, Avatar, Button } from "@mui/material";

import { ILoginForm } from "../interfaces";

const LoginForm: React.FC<ILoginForm> = ({ goToSignUp, onLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <>
      <Box>
        <Box style={{ marginBottom: 8 }}>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            label="Username"
            // placeholder="Username`"
            fullWidth
            variant="outlined"
            required
          />
        </Box>
        <Box>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            required
            label="Password"
            fullWidth
            variant="outlined"
          />
        </Box>
      </Box>
      <Box style={{ marginTop: 16 }}>
        <Button
          disableElevation
          onClick={() => onLogin(username, password)}
          fullWidth
          className="primary-btn"
          variant="contained"
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "rgb(0 127 255 / 74%)",
            backgroundColor: "#F3F6F9",
            textTransform: "capitalize",
          }}
        >
          Login
        </Button>
        <Box
          onClick={() => goToSignUp()}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            marginTop: 8,
            textDecoration: "underline",
            color: "#757575",
            fontWeight: 700,
          }}
        >
          Sign up
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
