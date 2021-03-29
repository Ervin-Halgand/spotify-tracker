import { AnyAction } from "redux";
import {
  CLEAR_STORE,
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
  SET_FOLLOWING_ARTIST,
  SET_FOLLOWING_ARTIST_LOADING,
  SET_SAVED_ALBUM,
  SET_SAVED_ALBUM_LOADING,
  SET_RECOMMANDATION_LOADING,
  SET_RECOMMANDATION,
  SET_RECOMMANDATION_MODAL,
} from "../constants/spotifyConstants";

export interface spotifyData {
  recommandation: {
    isLoading: boolean;
    modalIsOpen: boolean;
    data: [];
  };
  following: {
    artist: {
      data: any[];
      isLoading: boolean;
    };
    album: {
      data: any[];
      isLoading: boolean;
    };
  };
  user: {
    info: any[];
    isLoading: boolean;
  };
  topTrack: {
    recent: {
      track: any[];
      isLoading: boolean;
    };
    ever: {
      track: any[];
      isLoading: boolean;
    };
  };
  topArtist: {
    recent: {
      artist: any[];
      isLoading: boolean;
    };
    ever: {
      artist: any[];
      isLoading: boolean;
    };
  };
}
let initialState: spotifyData = {
  recommandation: {
    isLoading: false,
    modalIsOpen: false,
    data: [],
  },
  following: {
    artist: {
      data: [],
      isLoading: true,
    },
    album: {
      data: [],
      isLoading: true,
    },
  },
  user: {
    info: [],
    isLoading: true,
  },
  topTrack: {
    recent: {
      track: [],
      isLoading: true,
    },
    ever: {
      track: [],
      isLoading: true,
    },
  },
  topArtist: {
    recent: {
      artist: [],
      isLoading: true,
    },
    ever: {
      artist: [],
      isLoading: true,
    },
  },
};

export const spotifyReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CLEAR_STORE:
      return { state: initialState };
    case SET_USER:
      state.user.info = action.user;
      return { ...state };
    case SET_USER_LOADING:
      state.user.isLoading = action.isLoading;
      return { ...state };
    case SET_TOP_TRACK_RECENT:
      state.topTrack.recent.track = action.track;
      return { ...state };
    case SET_TOP_TRACK_RECENT_LOADING:
      state.topTrack.recent.isLoading = action.isLoading;
      return { ...state };
    case SET_TOP_TRACK_EVER:
      state.topTrack.ever.track = action.track;
      return { ...state };
    case SET_TOP_TRACK_EVER_LOADING:
      state.topTrack.ever.isLoading = action.isLoading;
      return { ...state };
    case SET_TOP_ARTIST_RECENT:
      state.topArtist.recent.artist = action.artist;
      return { ...state };
    case SET_TOP_ARTIST_RECENT_LOADING:
      state.topArtist.recent.isLoading = action.isLoading;
      return { ...state };
    case SET_TOP_ARTIST_EVER:
      state.topArtist.ever.artist = action.artist;
      return { ...state };
    case SET_TOP_ARTIST_EVER_LOADING:
      state.topArtist.ever.isLoading = action.isLoading;
      return { ...state };
    case SET_FOLLOWING_ARTIST:
      state.following.artist.data = action.followingArtist;
      return { ...state };
    case SET_FOLLOWING_ARTIST_LOADING:
      state.following.artist.isLoading = action.isLoading;
      return { ...state };
    case SET_SAVED_ALBUM:
      state.following.album.data = action.savedAlbum;
      return { ...state };
    case SET_SAVED_ALBUM_LOADING:
      state.following.album.isLoading = action.isLoading;
      return { ...state };
    case SET_RECOMMANDATION:
      state.recommandation.data = action.recommandation;
      return { ...state };
    case SET_RECOMMANDATION_LOADING:
      state.recommandation.isLoading = action.isLoading;
      return { ...state };
    case SET_RECOMMANDATION_MODAL:
      state.recommandation.modalIsOpen = action.open;
      return { ...state };
    default:
      return state;
  }
};
