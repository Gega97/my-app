import { IAppState } from "../interfaces";
import { AppActions } from "../types";

export const AppReducer = (state: IAppState, action: AppActions): IAppState => {
  switch (action.type) {
    case "logout":
      return {
        ...state,
        isLogged: false,
        user: null,
      };

    case "login":
      return {
        ...state,
        isLogged: true,
        user: action.payload,
      };
    case "handlePage":
      return {
        ...state,
        page: action.payload.page,
      };
    case "handleLoading":
      return {
        ...state,
        loading: action.payload.value,
      };
    case "follow":
      return {
        ...state,
        user: action.payload.user,
      };
    case "updateUser":
      return {
        ...state,
        user: action.payload.user,
      };

    default:
      return state;
  }
};
