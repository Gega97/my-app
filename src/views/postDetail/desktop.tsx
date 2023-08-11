import { Box } from "@mui/material";
import { IPostDetailProps } from "../../interfaces";

const DesktopView: React.FC<IPostDetailProps> = ({ state }) => {
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
      Esto es el Feed
    </Box>
  );
};

export default DesktopView;
