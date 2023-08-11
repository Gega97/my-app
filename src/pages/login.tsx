import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { IGlobarProps } from "../interfaces";
import DesktopView from "../views/login/desktop";
import MobileView from "../views/login/mobile";
import { AppContext } from "../context";
import myAppApi from "../api";

const Login: React.FC<IGlobarProps> = ({ isMobile }) => {
  const navigate: NavigateFunction = useNavigate();
  const { login, handlePage } = useContext(AppContext);

  useEffect(() => {
    handlePage(null);
  }, []);

  const onLogin = async (username: string, password: string): Promise<void> => {
    try {
      const user = await myAppApi.post("/auth/login", {
        username,
        password,
      });
      login(user.data?.user, user.data?.token);
      navigate("/home");
    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: "incorrect credentials",
        icon: "error",
        showConfirmButton: false,
      });
    }

    // login(user);
    // navigate("/feed");
  };

  const goToSignUp = () => {
    navigate("/signUp");
  };

  return isMobile ? (
    <MobileView login={onLogin} goToSignUp={goToSignUp} />
  ) : (
    <DesktopView login={onLogin} goToSignUp={goToSignUp} />
  );
};

export default Login;
