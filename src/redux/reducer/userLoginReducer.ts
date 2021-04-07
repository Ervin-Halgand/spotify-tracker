import { AnyAction } from "redux";
import {
  CLEAR_STORE,
  NOTIFICATION,
  SET_REFRESH_TOKEN,
  SET_THEME,
  SET_TOKEN,
} from "../constants/spotifyConstants";
import { toast, Slide } from "react-toastify";

export interface userLogin {
  access_token: string | null;
  refresh_token: string | null;
  isDarkTheme: any;
}

let initialState: userLogin = {
  access_token: localStorage.getItem("access_token"),
  refresh_token: localStorage.getItem("refresh_token"),
  isDarkTheme: localStorage.getItem("isDarkTheme") === "true" ? true : false,
};

const notificationType = (
  type: "warning" | "error" | "success",
  message: string,
  callback?: any,
  duration?: number
) => {
  switch (type) {
    case "error":
      toast.error(message, {
        position: "top-right",
        autoClose: duration || 2000,
        pauseOnHover: false,
        transition: Slide,
        onClose: callback,
      });
      break;
    case "success":
      toast.success(message, {
        position: "top-right",
        autoClose: duration || 2000,
        pauseOnHover: false,
        transition: Slide,
        onClose: callback,
      });
      break;

    case "warning":
      toast.warn(message, {
        position: "top-right",
        autoClose: duration || 2000,
        pauseOnHover: false,
        transition: Slide,
        onClose: callback,
      });
      break;
    default:
      return null;
  }
};

export const userLoginReducer = (
  state: userLogin = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case SET_TOKEN:
      return { access_token: action.token };
    case SET_REFRESH_TOKEN:
      return { ...state, refresh_token: action.refresh_token };
    case CLEAR_STORE:
      state.access_token = "";
      state.refresh_token = "";
      state.isDarkTheme = false;
      return { ...state };
    case NOTIFICATION:
      notificationType(
        action.notificationType,
        action.message,
        action?.callback
      );
      return { ...state };
    case SET_THEME:
      return { ...state, isDarkTheme: action.isDarkTheme };

    default:
      return state;
  }
};
