import { useContext, useEffect } from "react";

import { IGlobarProps } from "../interfaces";
import DesktopView from "../views/notification/desktop";
import MobileView from "../views/notification/mobile";
import { AppContext } from "../context";
import { NavigateFunction, useNavigate } from "react-router-dom";

const Notification: React.FC<IGlobarProps> = ({ isMobile }) => {
  const { state, logout, handlePage } = useContext(AppContext);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    handlePage("notification");
  }, []);

  useEffect(() => {
    if (!state.isLogged) navigate("/");
  }, []);

  return isMobile ? (
    <MobileView logout={logout} state={state} isMobile={isMobile} />
  ) : (
    <DesktopView logout={logout} state={state} isMobile={isMobile} />
  );
};

export default Notification;
