import { spotifyGetTopArtists } from "../../helpers/axios/Axios";
import { TimeRangeType } from "../../helpers/axios/constants";
import {
  SET_TOP_ARTIST_EVER,
  SET_TOP_ARTIST_EVER_ERROR,
  SET_TOP_ARTIST_EVER_LOADING,
  SET_TOP_ARTIST_RECENT,
  SET_TOP_ARTIST_RECENT_ERROR,
  SET_TOP_ARTIST_RECENT_LOADING,
} from "../constants/spotifyConstants";
import { notification } from "./userLoginAction";

export const setTopArtistRecent = (): any => {
  return async (dispatch: any, getState: any): Promise<any> => {
    dispatch(topArtistRecentIsLoading(true));
    dispatch(topArtistRecentHasError(false));
    spotifyGetTopArtists(
      getState().userLogin.access_token,
      TimeRangeType.SHORT,
      50
    )
      .then((res) => {
        const artist = res.data.items;
        dispatch({ type: SET_TOP_ARTIST_RECENT, artist });
        localStorage.setItem("topArtistRecent", artist);
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          const localData = localStorage.getItem("topArtistRecent");
          if (localData) {
            const artist = JSON.parse(localData);
            dispatch({ type: SET_TOP_ARTIST_RECENT, artist });
          }
        } else {
          notification("error", "Can't load your top artist");
          dispatch(topArtistRecentHasError(true));
        }
      })
      .finally(() => dispatch(topArtistRecentIsLoading(false)));
  };
};

export const topArtistRecentIsLoading = (isLoading: boolean): any => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SET_TOP_ARTIST_RECENT_LOADING, isLoading });
  };
};

export const topArtistRecentHasError = (hasError: boolean): any => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SET_TOP_ARTIST_RECENT_ERROR, hasError });
  };
};

export const setTopArtistEver = (): any => {
  return async (dispatch: any, getState: any): Promise<any> => {
    dispatch(topArtistEverIsLoading(true));
    dispatch(topArtistEverHasError(false));
    spotifyGetTopArtists(
      getState().userLogin.access_token,
      TimeRangeType.LONG,
      50
    )
      .then((res) => {
        const artist = res.data.items;
        dispatch({ type: SET_TOP_ARTIST_EVER, artist });
        localStorage.setItem("topArtistEver", JSON.stringify(artist));
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          const localData = localStorage.getItem("topArtistEver");
          if (localData) {
            const artist = JSON.parse(localData);
            dispatch({ type: SET_TOP_ARTIST_EVER, artist });
          } else {
            notification("error", "Can't load your top artist");
            dispatch(topArtistEverHasError(true));
          }
        }
      })
      .finally(() => dispatch(topArtistEverIsLoading(false)));
  };
};

export const topArtistEverIsLoading = (isLoading: boolean): any => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SET_TOP_ARTIST_EVER_LOADING, isLoading });
  };
};

export const topArtistEverHasError = (hasError: boolean): any => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SET_TOP_ARTIST_EVER_ERROR, hasError });
  };
};
