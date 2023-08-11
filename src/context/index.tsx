import { createContext } from "react";
import { IAppContext, IAppState } from "../interfaces";
import { User } from "../types";

const initialState: IAppState = {
  isLogged: false,
  user: null,
  page: null,
  loading: false,
  homePost: [],
};

export const AppContext = createContext<IAppContext>({
  state: initialState,
  login: (user: User, token: string) => {},
  logout: () => {},
  handlePage: (page: string | null) => {},
  updateUser: (user: User) => {},
  handleLoading: (value: boolean) => {},
  handleFollow: (username: string) => {},
  handleUnfollow: (username: string) => {},
});
