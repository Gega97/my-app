import { useReducer } from "react";
import { AppReducer } from "./reducer";
import { IAppState, IAppContext } from "../interfaces";
import { AppContext } from ".";
import { EasyProviderProps, User } from "../types";

const initialState: IAppState = {
  isLogged: false,
  user: null,
  page: null,
  loading: false,
  homePost: [],
};

const initState = (): IAppState => {
  const localStorageUser = localStorage.getItem("user");
  const user: User = localStorageUser ? JSON.parse(localStorageUser) : null;
  return {
    isLogged: user === null ? false : true,
    user,
    page: null,
    loading: false,
    homePost: [],
  };
};

export const AppProvider: React.FC<EasyProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, initState);
  const login = (user: User, token: string): void => {
    dispatch({
      type: "login",
      payload: user,
    });
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("my-app-token", token);
  };

  const logout = (): void => {
    dispatch({
      type: "logout",
    });
    localStorage.clear();
  };

  const handlePage = (page: string | null): void => {
    dispatch({
      type: "handlePage",
      payload: { page },
    });
  };

  const updateUser = (user: User) => {
    dispatch({
      type: "updateUser",
      payload: { user },
    });
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLoading = (value: boolean) => {
    dispatch({
      type: "handleLoading",
      payload: { value },
    });
  };

  const handleFollow = (username: string) => {
    const user: User | null = state.user;
    user?.follows.push(username);
    dispatch({
      type: "follow",
      payload: { user },
    });
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleUnfollow = (username: string) => {
    const user: User | null = state.user;
    const filterFollows = user?.follows.filter(
      (usr: string) => username != usr
    );
    if (user && filterFollows) {
      user.follows = filterFollows;
    }
    dispatch({
      type: "unfollow",
      payload: { user },
    });
    localStorage.setItem("user", JSON.stringify(user));
  };
  const appContext: IAppContext = {
    state,
    login,
    logout,
    handlePage,
    updateUser,
    handleLoading,
    handleFollow,
    handleUnfollow,
  };

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};
