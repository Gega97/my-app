import { Box } from "@mui/material";
import { IPageProps } from "../../interfaces";
import AppBar from "../../components/appBar";
import NavigationBar from "../../components/navigationBar";

const MobileView: React.FC<IPageProps> = ({ isMobile, state }) => {
  return (
    <Box
      style={{
        height: "100vh",
        backgroundColor: "#F3F6F9",
      }}
    >
      <AppBar isMobile={isMobile} state={state} />
      <NavigationBar isMobile={isMobile} state={state} />
    </Box>
  );
};

export default MobileView;
