import { AnyAction } from "redux";
import {
  CLEAR_STORE,
  SET_USER,
  SET_USER_ERROR,
  SET_USER_LOADING,
} from "../constants/spotifyConstants";

export interface userInfoSpotify {
  info: any[];
  isLoading: boolean;
  error: boolean;
}
let initialState: userInfoSpotify = {
  info: [],
  isLoading: true,
  error: false,
};

export const userInfoReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CLEAR_STORE:
      return {...initialState };
    case SET_USER:
      state.info = action.user;
      return { ...state };
    case SET_USER_LOADING:
      state.isLoading = action.isLoading;
      return { ...state };
    case SET_USER_ERROR:
      state.error = action.hasError;
      return { ...state };
    default:
      return state;
  }
};
