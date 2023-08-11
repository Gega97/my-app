import { Box, Paper, Button } from "@mui/material";
import { ISignupProps } from "../../interfaces";

const DesktopView: React.FC<ISignupProps> = ({ goToLogin }) => {
  return (
    <Box
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F3F6F9",
      }}
    >
      <Paper
        elevation={3}
        style={{
          width: 750,
          height: 500,
          borderRadius:5
      
        }}
      >
        <Box
          style={{
            display: "flex",
            height: "100%",
            borderRadius:5
      
            // backgroundColor: "#808080",
          }}
        >
          <Box
            style={{
              width: "50%",
              backgroundColor: "rgb(0 127 255 / 74%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              borderRadius:5
      
            }}
          >
            <Box style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF" }}>
              WELCOME
            </Box>
            <Box style={{ marginTop: 16 }}>
              <Button
                // onClick={() => login()}
                className="primary-btn"
                variant="contained"
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "rgb(0 127 255 / 74%)",
                }}
              >
                LOGIN
              </Button>
            </Box>
          </Box>
          <Box style={{ width: "50%", display: "flex", alignItems: "center",    borderRadius:5
       }}>
            <img
              style={{ width: "100%" }}
              src="https://img.freepik.com/vector-gratis/ilustracion-concepto-buffer_114360-2267.jpg?w=740&t=st=1689209413~exp=1689210013~hmac=f5b222fdc85b1033f690fc7cbdeca4bf6da8b5227a62494c3532cf21b5dcea68"
              alt=""
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default DesktopView;
