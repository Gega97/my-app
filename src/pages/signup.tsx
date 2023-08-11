import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { IGlobarProps } from "../interfaces";
import DesktopView from "../views/signup/desktop";
import MobileView from "../views/signup/mobile";
import { AppContext } from "../context";
import myAppApi from "../api";

const Signup: React.FC<IGlobarProps> = ({ isMobile }) => {
  const navigate: NavigateFunction = useNavigate();
  const { handlePage, login } = useContext(AppContext);

  useEffect(() => {
    handlePage(null);
  }, []);

  const goToLogin = () => {
    navigate("/");
  };

  const onRegistry = async (
    username: string,
    password: string,
    confirmPassword: string
  ): Promise<void> => {
    try {
      const user = await myAppApi.post("/auth/registry", {
        username,
        password,
        confirmPassword,
      });
      login(user.data?.user, user.data?.token);
      Swal.fire({
        title: "Success",
        text: "Profile created successfully",
        icon: "success",
        showConfirmButton: false,
      })
        .then((): void => {
          navigate("/home");
        })
        .catch((err): void => {});
    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: err.response.data?.msg,
        icon: "error",
        showConfirmButton: false,
      });
    }

    // login(user);
    // navigate("/feed");
  };

  return isMobile ? (
    <MobileView goToLogin={goToLogin} onRegistry={onRegistry} />
  ) : (
    <DesktopView goToLogin={goToLogin} onRegistry={onRegistry} />
  );
};

export default Signup;
