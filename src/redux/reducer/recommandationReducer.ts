import { AnyAction } from "redux";
import {
  CLEAR_STORE,
  SET_RECOMMANDATION_LOADING,
  SET_RECOMMANDATION,
  SET_RECOMMANDATION_MODAL,
} from "../constants/spotifyConstants";

export interface recommandationSpotify {
  isLoading: boolean;
  modalIsOpen: boolean;
  data: [];
  error: boolean;
}
let initialState: recommandationSpotify = {
  isLoading: false,
  modalIsOpen: false,
  data: [],
  error: false,
};

export const recommandationReducer = (
  state = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case CLEAR_STORE:
      return {...initialState };
    case SET_RECOMMANDATION:
      state.data = action.recommandation;
      return { ...state };
    case SET_RECOMMANDATION_LOADING:
      state.isLoading = action.isLoading;
      return { ...state };
    case SET_RECOMMANDATION_MODAL:
      state.modalIsOpen = action.open;
      return { ...state };
    default:
      return state;
  }
};
