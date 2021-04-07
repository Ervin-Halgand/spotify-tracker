import { AnyAction } from "redux";
import {
  CLEAR_STORE,
  SET_TOP_TRACK_RECENT,
  SET_TOP_TRACK_EVER,
  SET_TOP_TRACK_RECENT_LOADING,
  SET_TOP_TRACK_EVER_LOADING,
  SET_TOP_TRACK_EVER_ERROR,
  SET_TOP_TRACK_RECENT_ERROR,
} from "../constants/spotifyConstants";

export interface topTrackSpotify {
  recent: {
    track: any[];
    isLoading: boolean;
    error: boolean;
  };
  ever: {
    track: any[];
    isLoading: boolean;
    error: boolean;
  };
}
let initialState: topTrackSpotify = {
  recent: {
    track: [],
    isLoading: true,
    error: false,
  },
  ever: {
    track: [],
    isLoading: true,
    error: false,
  },
};

export const topTrackReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CLEAR_STORE:
      return {...initialState };
    case SET_TOP_TRACK_RECENT:
      state.recent.track = action.track;
      return { ...state };
    case SET_TOP_TRACK_RECENT_LOADING:
      state.recent.isLoading = action.isLoading;
      return { ...state };
    case SET_TOP_TRACK_RECENT_ERROR:
      state.recent.error = action.hasError;
      return { ...state };
    case SET_TOP_TRACK_EVER:
      state.ever.track = action.track;
      return { ...state };
    case SET_TOP_TRACK_EVER_LOADING:
      state.ever.isLoading = action.isLoading;
      return { ...state };
    case SET_TOP_TRACK_EVER_ERROR:
      state.ever.error = action.hasError;
      return { ...state };
    default:
      return state;
  }
};
