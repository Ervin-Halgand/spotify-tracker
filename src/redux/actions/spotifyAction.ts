import {
  SET_TOKEN,
  SET_REFRESH_TOKEN,
  CLEAR_STORE,
  NOTIFICATION,
  SET_TOP_TRACK_RECENT,
  SET_TOP_TRACK_EVER,
  SET_TOP_TRACK_RECENT_LOADING,
  SET_TOP_TRACK_EVER_LOADING,
  SET_TOP_ARTIST_RECENT,
  SET_TOP_ARTIST_RECENT_LOADING,
  SET_TOP_ARTIST_EVER_LOADING,
  SET_TOP_ARTIST_EVER,
  SET_USER,
  SET_USER_LOADING,
  SET_FOLLOWING_ARTIST_LOADING,
  SET_FOLLOWING_ARTIST,
  SET_SAVED_ALBUM_LOADING,
  SET_SAVED_ALBUM,
  SET_RECOMMANDATION,
  SET_RECOMMANDATION_LOADING,
  SET_RECOMMANDATION_MODAL,
  SET_THEME,
} from "../constants/spotifyConstants";
import { store } from "../store";

export const setToken = (token: string): string => {
  localStorage.setItem("access_token", token);
  const tok = store.dispatch({ type: SET_TOKEN, token }).token;
  return tok;
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

export const setTopTrackRecent = (track: any[]): void => {
  store.dispatch({ type: SET_TOP_TRACK_RECENT, track });
};

export const topTrackRecentIsLoading = (isLoading: boolean): void => {
  store.dispatch({ type: SET_TOP_TRACK_RECENT_LOADING, isLoading });
};

export const setTopTrackEver = (track: any[]): void => {
  store.dispatch({ type: SET_TOP_TRACK_EVER, track });
};

export const topTrackEverIsLoading = (isLoading: boolean): void => {
  store.dispatch({ type: SET_TOP_TRACK_EVER_LOADING, isLoading });
};

export const setTopArtistRecent = (artist: any[]): void => {
  store.dispatch({ type: SET_TOP_ARTIST_RECENT, artist });
};

export const topArtistRecentIsLoading = (isLoading: boolean): void => {
  store.dispatch({ type: SET_TOP_ARTIST_RECENT_LOADING, isLoading });
};

export const setTopArtistEver = (artist: any[]): void => {
  store.dispatch({ type: SET_TOP_ARTIST_EVER, artist });
};

export const topArtistEverIsLoading = (isLoading: boolean): void => {
  store.dispatch({ type: SET_TOP_ARTIST_EVER_LOADING, isLoading });
};

export const setUser = (user: any): void => {
  store.dispatch({ type: SET_USER, user });
};

export const userIsLoading = (isLoading: boolean): void => {
  store.dispatch({ type: SET_USER_LOADING, isLoading });
};

export const followingArtistIsLoading = (isLoading: boolean): void => {
  store.dispatch({ type: SET_FOLLOWING_ARTIST_LOADING, isLoading });
};

export const setFollowingArtist = (followingArtist: any): void => {
  store.dispatch({ type: SET_FOLLOWING_ARTIST, followingArtist });
};

export const savedAlbumIsLoading = (isLoading: boolean): void => {
  store.dispatch({ type: SET_SAVED_ALBUM_LOADING, isLoading });
};

export const setSavedAlbum = (savedAlbum: any): void => {
  store.dispatch({ type: SET_SAVED_ALBUM, savedAlbum });
};

export const setRecommandation = (recommandation: any): void => {
  store.dispatch({ type: SET_RECOMMANDATION, recommandation });
};

export const setRecommandationLoading = (isLoading: any): void => {
  store.dispatch({ type: SET_RECOMMANDATION_LOADING, isLoading });
};

export const setRecommandationModal = (open: any): void => {
  store.dispatch({ type: SET_RECOMMANDATION_MODAL, open });
};
