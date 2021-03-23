import { AnyAction } from "redux";
import {
  CLEAR_STORE,
  SET_REFRESH_TOKEN,
  SET_TOKEN,
} from "../constants/spotifyConstants";

export interface SpotifyState {
  access_token: string | null;
  refresh_token: string | null;
}

let initialState: SpotifyState = {
  access_token: localStorage.getItem("access_token"),
  refresh_token: localStorage.getItem("refresh_token"),
};

export const reducer = (
  state: SpotifyState = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, access_token: action.token };
    case SET_REFRESH_TOKEN:
      return { ...state, refresh_token: action.refresh_token };
    case CLEAR_STORE:
      return { ...state, refresh_token: "", access_token: "" };
    default:
      return state;
  }
};
