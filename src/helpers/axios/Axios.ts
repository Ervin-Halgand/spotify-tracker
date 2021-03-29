import axios from "axios";
import {
  BASE_URL,
  ME,
  TOP_ARTISTS,
  TOP_TRACKS,
  TimeRangeType,
  TRACKS,
  FOLLOWING_ARTIST,
  SAVED_ALBUM,
  GET_RECOMMANDATION,
} from "./constants";

const Axios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const spotifyGetUserProfile = (access_token: string): Promise<any> => {
  return Axios.get(ME, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const spotifyGetTopTracks = (
  access_token: string,
  time_range?: TimeRangeType,
  limit?: Number
): Promise<any> => {
  return Axios.get(
    `${TOP_TRACKS}${time_range ? `?time_range=${time_range}` : ""}${
      limit ? `&limit=${limit}` : ""
    }`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};

export const spotifyGetTopArtists = (
  access_token: string,
  time_range?: TimeRangeType,
  limit?: Number
): Promise<any> => {
  return Axios.get(
    `${TOP_ARTISTS}${time_range ? `?time_range=${time_range}` : ""}${
      limit ? `&limit=${limit}` : ""
    }`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
};

export const spotifyGetTracks = (
  access_token: string,
  tracks: string[]
): Promise<any> => {
  return Axios.get(`${TRACKS}${tracks.toString()}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const spotifyRefreshToken = (
  refresh_token: string | null
): Promise<any> =>
  axios.post("http://localhost:8080/refresh", null, {
    headers: { "Content-Type": "text/plain" },
    params: {
      refresh_token: refresh_token,
    },
  });

export const spotifyGetFollowingArtist = (
  access_token: string,
  limit?: Number
): Promise<any> => {
  return Axios.get(`${FOLLOWING_ARTIST}${limit ? `&limit=${limit}` : ""}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const spotifyGetSavedAlbum = (
  access_token: string,
  limit?: Number
): Promise<any> => {
  return Axios.get(`${SAVED_ALBUM}${limit ? `?limit=${limit}` : ""}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};

export const spotifyGetRecommandation = (
  access_token: string,
  artists_seed: string[],
  genres: string[],
  tracks_seed: string[]
): Promise<any> => {
  return Axios.get(
    `${GET_RECOMMANDATION}?market=US&seed_artists=${artists_seed
      .toString()
      .replaceAll(" ", "_")
      .replaceAll(",", "%2C")}&seed_genres=${genres
      .toString()
      .replaceAll(" ", "_")
      .replaceAll(",", "%2C")}&seed_tracks=${tracks_seed
      .toString()
      .replaceAll(" ", "_")
      .replaceAll(",", "%2C")}&min_energy=0.4&min_popularity=50`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
      data: {},
    }
  );
};

export default Axios;
