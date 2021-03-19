import { AnyAction } from "redux";
import { SET_REFRESH_TOKEN, SET_TOKEN } from "../constants/spotifyConstants";

export interface SpotifyState {
  access_token: string;
  refresh_token: string;
}

let initialState: SpotifyState = {
  access_token: "",
  refresh_token: "",
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
    default:
      return state;
  }
};
