export const BASE_URL: string = "https://api.spotify.com/v1/";
export const ME: string = "/me";
export const TOP_TRACKS: string = "/me/top/tracks";
export const TOP_ARTISTS: string = "/me/top/artists";
export const TRACKS: string = "/tracks?ids=";
export const FOLLOWING_ARTIST: string = "/me/following?type=artist";
export const SAVED_ALBUM: string = "/me/albums";
export const GET_RECOMMANDATION: string = "/recommendations";

export enum TimeRangeType {
    LONG = "long_term",
    MEDIUM = "medium_term",
    SHORT = "short_term",
  }