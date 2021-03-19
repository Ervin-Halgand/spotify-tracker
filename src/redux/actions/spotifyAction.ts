import { SET_TOKEN, SET_REFRESH_TOKEN } from "../constants/spotifyConstants";
import { store } from "../store";

export const setToken = (token: string): void => {
  store.dispatch({ type: SET_TOKEN, token });
};

export const setRefreshToken = (refresh_token: string): void => {
  store.dispatch({ type: SET_REFRESH_TOKEN, refresh_token });
};
