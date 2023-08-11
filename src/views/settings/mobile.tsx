import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { IPageProps } from "../../interfaces";
import AppBar from "../../components/appBar";
import NavigationBar from "../../components/navigationBar";

const MobileView: React.FC<IPageProps> = ({ isMobile, state, logout }) => {
  return (
    <Box
      style={{
        height: "100vh",
        backgroundColor: "#F3F6F9",
      }}
    >
      <AppBar isMobile={isMobile} state={state} />
      <Box style={{ padding: 8 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => logout()}>
              <ListItemIcon>
                <ExitToAppIcon fontSize="large" />
              </ListItemIcon>

              <Box
                style={{
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#757575",
                }}
              >
                Close
              </Box>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <NavigationBar isMobile={isMobile} state={state} />
    </Box>
  );
};

export default MobileView;
