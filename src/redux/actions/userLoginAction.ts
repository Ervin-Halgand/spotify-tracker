import { spotifyRefreshToken } from "../../helpers/axios/Axios";
import {
  SET_TOKEN,
  SET_REFRESH_TOKEN,
  CLEAR_STORE,
  NOTIFICATION,
  SET_THEME,
} from "../constants/spotifyConstants";
import { store } from "../store";

export const setToken = (token: string): string => {
  localStorage.setItem("access_token", token);
  const tok = store.dispatch({ type: SET_TOKEN, token }).token;
  return tok;
};

export const refreshRefreshToken = (history: any) => {
  return async (dispatch: any, getState: any): Promise<any> => {
    await spotifyRefreshToken(getState().userLogin.refresh_token)
      .then((res) => {
        if (res.data?.error) {
          clearStore();
          notification("error", "Please loggin again", () =>
            history.replace("/login")
          );
          return;
        }
        const token = res.data.access_token;
        setToken(token);
      })
      .catch((err) => {
        clearStore();
        notification("error", "Please loggin again", () =>
          history.replace("/login")
        );
      });
  };
};

export const setRefreshToken = (refresh_token: string): void => {
  localStorage.setItem("refresh_token", refresh_token);
  store.dispatch({ type: SET_REFRESH_TOKEN, refresh_token });
};

export const clearStore = (): void => {
  localStorage.clear();
  store.dispatch({ type: CLEAR_STORE });
};

export const setTheme = (isDarkTheme: boolean): void => {
  localStorage.setItem("isDarkTheme", JSON.stringify(isDarkTheme));
  store.dispatch({ type: SET_THEME, isDarkTheme });
};

export const notification = (
  notificationType: "warning" | "error" | "success",
  message: string,
  callback?: Function,
  duration?: number
): void => {
  store.dispatch({
    type: NOTIFICATION,
    notificationType,
    message,
    callback,
    duration,
  });
};
