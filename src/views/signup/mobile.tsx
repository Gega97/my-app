import { Box, Paper } from "@mui/material";
import { ISignupProps } from "../../interfaces";
import SignupForm from "../../components/signupForm";

const MobileView: React.FC<ISignupProps> = ({ goToLogin, onRegistry }) => {
  return (
    <Box
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F3F6F9",
        padding: 24,
      }}
    >
      <Paper
        elevation={5}
        style={{
          width: "100%",
          height: 500,
          borderRadius: 5,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            marginTop: 12,
            width: "100%",
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          <Box>
            <Box
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "rgb(0 127 255 / 74%)",
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              WELCOME
            </Box>
          </Box>
          <SignupForm goToLogin={goToLogin} onRegistry={onRegistry} />
          {/* <img
            style={{ width: "100%" }}
            src="https://img.freepik.com/vector-gratis/ilustracion-concepto-buffer_114360-2267.jpg?w=740&t=st=1689209413~exp=1689210013~hmac=f5b222fdc85b1033f690fc7cbdeca4bf6da8b5227a62494c3532cf21b5dcea68"
            alt=""
          /> */}
        </Box>
      </Paper>
    </Box>
  );
};

export default MobileView;
