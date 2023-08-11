import { useContext, useEffect } from "react";

import { IGlobarProps } from "../interfaces";
import DesktopView from "../views/settings/desktop";
import MobileView from "../views/settings/mobile";
import { AppContext } from "../context";
import { NavigateFunction, useNavigate } from "react-router-dom";

const Settings: React.FC<IGlobarProps> = ({ isMobile }) => {
  const { state, logout, handlePage } = useContext(AppContext);
  const navigate: NavigateFunction = useNavigate();
  useEffect(() => {
    handlePage("settings");
  }, []);

  useEffect(() => {
    if (!state.isLogged) navigate("/");
  }, []);

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return isMobile ? (
    <MobileView logout={onLogout} state={state} isMobile={isMobile} />
  ) : (
    <DesktopView logout={onLogout} state={state} isMobile={isMobile} />
  );
};

export default Settings;
