import { AnyAction } from "redux";
import {
  CLEAR_STORE,
  SET_TOP_ARTIST_RECENT,
  SET_TOP_ARTIST_RECENT_LOADING,
  SET_TOP_ARTIST_EVER_LOADING,
  SET_TOP_ARTIST_EVER,
  SET_TOP_ARTIST_EVER_ERROR,
  SET_TOP_ARTIST_RECENT_ERROR,
} from "../constants/spotifyConstants";

export interface topArtistSpotify {
  recent: {
    artist: any[];
    isLoading: boolean;
    error: boolean;
  };
  ever: {
    artist: any[];
    isLoading: boolean;
    error: boolean;
  };
}

let initialState: topArtistSpotify = {
  recent: {
    artist: [],
    isLoading: true,
    error: false,
  },
  ever: {
    artist: [],
    isLoading: true,
    error: false,
  },
};

export const topArtistReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CLEAR_STORE:
      return {...initialState };
    case SET_TOP_ARTIST_RECENT:
      state.recent.artist = action.artist;
      return { ...state };
    case SET_TOP_ARTIST_RECENT_LOADING:
      state.recent.isLoading = action.isLoading;
      return { ...state };
    case SET_TOP_ARTIST_RECENT_ERROR:
      state.recent.error = action.hasError;
      return { ...state };
    case SET_TOP_ARTIST_EVER:
      state.ever.artist = action.artist;
      return { ...state };
    case SET_TOP_ARTIST_EVER_LOADING:
      state.ever.isLoading = action.isLoading;
      return { ...state };
    case SET_TOP_ARTIST_EVER_ERROR:
      state.ever.error = action.hasError;
      return { ...state };
    default:
      return state;
  }
};
