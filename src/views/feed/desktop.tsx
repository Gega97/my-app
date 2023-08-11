import { Box } from "@mui/material";
import { IFeedProps } from "../../interfaces";

const DesktopView: React.FC<IFeedProps> = ({ state }) => {
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
