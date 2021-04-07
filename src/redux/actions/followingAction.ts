import {
  spotifyGetFollowingArtist,
  spotifyGetSavedAlbum,
} from "../../helpers/axios/Axios";
import {
  SET_FOLLOWING_ARTIST,
  SET_FOLLOWING_ARTIST_ERROR,
  SET_FOLLOWING_ARTIST_LOADING,
  SET_SAVED_ALBUM,
  SET_SAVED_ALBUM_ERROR,
  SET_SAVED_ALBUM_LOADING,
} from "../constants/spotifyConstants";
import { notification } from "./userLoginAction";

export const followingArtistIsLoading = (isLoading: boolean): any => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SET_FOLLOWING_ARTIST_LOADING, isLoading });
  };
};

export const followingArtistHasError = (hasError: boolean): any => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SET_FOLLOWING_ARTIST_ERROR, hasError });
  };
};

export const setFollowingArtist = (): any => {
  return async (dispatch: any, getState: any): Promise<any> => {
    dispatch(followingArtistIsLoading(true));
    dispatch(followingArtistHasError(false));
    spotifyGetFollowingArtist(getState().userLogin.access_token, 50)
      .then((res) => {
        const followingArtist = res.data.artists.items;
        dispatch({ type: SET_FOLLOWING_ARTIST, followingArtist });
        localStorage.setItem(
          "followingArtist",
          JSON.stringify(followingArtist)
        );
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          const localData = localStorage.getItem("followingArtist");
          if (localData) {
            const artistFromLocal = JSON.parse(localData);
            dispatch({ type: SET_FOLLOWING_ARTIST, artistFromLocal });
          }
        } else {
          notification("error", "Can't load following artist");
          dispatch(followingArtistHasError(true));
        }
        console.error(err);
      })
      .finally(() => dispatch(followingArtistIsLoading(false)));
  };
};

export const savedAlbumIsLoading = (isLoading: boolean): any => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SET_SAVED_ALBUM_LOADING, isLoading });
  };
};

export const savedAlbumHasError = (hasError: boolean): any => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SET_SAVED_ALBUM_ERROR, hasError });
  };
};

export const setSavedAlbum = (): any => {
  return async (dispatch: any, getState: any): Promise<any> => {
    dispatch(savedAlbumIsLoading(true));
    dispatch(savedAlbumHasError(false));
    spotifyGetSavedAlbum(getState().userLogin.access_token, 50)
      .then((res) => {
        const savedAlbum = res.data.items;
        dispatch({ type: SET_SAVED_ALBUM, savedAlbum });
        localStorage.setItem("savedAlbum", JSON.stringify(savedAlbum));
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          const localData = localStorage.getItem("savedAlbum");
          if (localData) {
            const savedAlbumFromLocal = JSON.parse(localData);
            dispatch({ type: SET_SAVED_ALBUM, savedAlbumFromLocal });
          }
        } else {
          notification("error", "Can't load saved album");
          dispatch(savedAlbumHasError(true));
        }
        console.error(err);
      })
      .finally(() => dispatch(savedAlbumIsLoading(false)));
  };
};
