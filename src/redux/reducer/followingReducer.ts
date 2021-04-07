import { AnyAction } from "redux";
import {
  CLEAR_STORE,
  SET_FOLLOWING_ARTIST,
  SET_FOLLOWING_ARTIST_ERROR,
  SET_FOLLOWING_ARTIST_LOADING,
  SET_SAVED_ALBUM,
  SET_SAVED_ALBUM_ERROR,
  SET_SAVED_ALBUM_LOADING,
} from "../constants/spotifyConstants";

export interface followingSpotify {
  artist: {
    data: any[];
    isLoading: boolean;
    error: boolean;
  };
  album: {
    data: any[];
    isLoading: boolean;
    error: boolean;
  };
}
let initialState: followingSpotify = {
  artist: {
    data: [],
    isLoading: true,
    error: false,
  },
  album: {
    data: [],
    isLoading: true,
    error: false,
  },
};

export const followingReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CLEAR_STORE:
      return { ...initialState };
    case SET_FOLLOWING_ARTIST:
      state.artist.data = action.followingArtist;
      return { ...state };
    case SET_FOLLOWING_ARTIST_LOADING:
      state.artist.isLoading = action.isLoading;
      return { ...state };
    case SET_FOLLOWING_ARTIST_ERROR:
      state.artist.error = action.hasError;
      return { ...state };
    case SET_SAVED_ALBUM:
      state.album.data = action.savedAlbum;
      return { ...state };
    case SET_SAVED_ALBUM_LOADING:
      state.album.isLoading = action.isLoading;
      return { ...state };
    case SET_SAVED_ALBUM_ERROR:
      state.album.error = action.hasError;
      return { ...state };
    default:
      return state;
  }
};
