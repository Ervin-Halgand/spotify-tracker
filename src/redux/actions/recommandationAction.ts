import { spotifyGetRecommandation } from "../../helpers/axios/Axios";
import {
  SET_RECOMMANDATION,
  SET_RECOMMANDATION_ERROR,
  SET_RECOMMANDATION_LOADING,
  SET_RECOMMANDATION_MODAL,
} from "../constants/spotifyConstants";
import { notification } from "./userLoginAction";

export const setRecommandation = (
  artists_seed: any,
  genre: any,
  tracks_seed: any
): any => {
  return async (dispatch: any, getState: any): Promise<any> => {
    dispatch(setRecommandationLoading(true));
    dispatch(setRecommandationHasError(false));
    spotifyGetRecommandation(
      getState().userLogin.access_token,
      artists_seed,
      genre,
      tracks_seed
    )
      .then((res) => {
        const recommandation = res.data.tracks;
        dispatch({ type: SET_RECOMMANDATION, recommandation });
        dispatch(setRecommandationModal(true));
      })
      .catch((err) => {
        if (err.message === "Network Error")
          notification("warning", "Connect to internet to see recommandation");
        else {
          dispatch(setRecommandationHasError(true));
          notification("error", "please load recommandation again");
        }
      })
      .finally(() => dispatch(setRecommandationLoading(false)));
  };
};

export const setRecommandationLoading = (isLoading: any): any => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SET_RECOMMANDATION_LOADING, isLoading });
  };
};

export const setRecommandationModal = (open: boolean): any => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SET_RECOMMANDATION_MODAL, open });
  };
};

export const setRecommandationHasError = (hasError: boolean): any => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SET_RECOMMANDATION_ERROR, hasError });
  };
};
