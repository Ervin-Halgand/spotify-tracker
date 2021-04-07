import { spotifyGetTopTracks } from "../../helpers/axios/Axios";
import { TimeRangeType } from "../../helpers/axios/constants";
import {
  SET_TOP_TRACK_EVER,
  SET_TOP_TRACK_EVER_ERROR,
  SET_TOP_TRACK_EVER_LOADING,
  SET_TOP_TRACK_RECENT,
  SET_TOP_TRACK_RECENT_ERROR,
  SET_TOP_TRACK_RECENT_LOADING,
} from "../constants/spotifyConstants";
import { notification } from "./userLoginAction";

export const setTopTrackRecent = (): any => {
  return async (dispatch: any, getState: any): Promise<any> => {
    dispatch(topTrackRecentIsLoading(true));
    dispatch(topTrackRecentHasError(false));
    spotifyGetTopTracks(
      getState().userLogin.access_token,
      TimeRangeType.SHORT,
      50
    )
      .then((res) => {
        const track = res.data.items;
        dispatch({ type: SET_TOP_TRACK_RECENT, track });
        localStorage.setItem("topTrackRecent", JSON.stringify(res.data.items));
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          const localData = localStorage.getItem("topTrackRecent");
          if (localData) {
            const track = JSON.parse(localData);
            dispatch({ type: SET_TOP_TRACK_RECENT, track });
          } else {
            notification("error", "Can't load your top recent top track");
            dispatch(topTrackRecentHasError(true));
          }
        }
      })
      .finally(() => dispatch(topTrackRecentIsLoading(false)));
  };
};

export const topTrackRecentIsLoading = (isLoading: boolean): any => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SET_TOP_TRACK_RECENT_LOADING, isLoading });
  };
};

export const topTrackRecentHasError = (hasError: boolean): any => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SET_TOP_TRACK_RECENT_ERROR, hasError });
  };
};

export const setTopTrackEver = (): any => {
  return async (dispatch: any, getState: any): Promise<any> => {
    dispatch(topTrackEverIsLoading(true));
    dispatch(topTrackEverHasError(false));
    spotifyGetTopTracks(
      getState().userLogin.access_token,
      TimeRangeType.LONG,
      50
    )
      .then((res) => {
        const track = res.data.items;
        dispatch({ type: SET_TOP_TRACK_EVER, track });
        localStorage.setItem("topTrackEver", JSON.stringify(res.data.items));
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          const localData = localStorage.getItem("topTrackEver");
          if (localData) {
            const track = JSON.parse(localData);
            dispatch({ type: SET_TOP_TRACK_EVER, track });
          }
        } else {
          notification("error", "Can't load your ever top track");
          dispatch(topTrackEverHasError(true));
        }
      })
      .finally(() => dispatch(topTrackEverIsLoading(false)));
  };
};

export const topTrackEverIsLoading = (isLoading: boolean): any => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SET_TOP_TRACK_EVER_LOADING, isLoading });
  };
};

export const topTrackEverHasError = (hasError: boolean): any => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SET_TOP_TRACK_EVER_ERROR, hasError });
  };
};
