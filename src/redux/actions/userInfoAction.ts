import { spotifyGetUserProfile } from "../../helpers/axios/Axios";
import {
  SET_USER,
  SET_USER_ERROR,
  SET_USER_LOADING,
} from "../constants/spotifyConstants";

export const setUser = (): any => {
  return async (dispatch: any, getState: any): Promise<any> => {
    dispatch(userIsLoading(true));
    dispatch(userHasError(false));
    await spotifyGetUserProfile(getState().userLogin.access_token)
      .then((res) => {
        const user = res.data;
        dispatch({ type: SET_USER, user });
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(userIsLoading(false));
      })
      .catch(async () => {
        dispatch(userHasError(true));
      });
  };
};

export const userIsLoading = (isLoading: boolean): any => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SET_USER_LOADING, isLoading });
  };
};

export const userHasError = (hasError: boolean): any => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: SET_USER_ERROR, hasError });
  };
};
