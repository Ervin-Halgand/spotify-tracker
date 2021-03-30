import {
  clearStore,
  followingArtistIsLoading,
  notification,
  savedAlbumIsLoading,
  setFollowingArtist,
  setSavedAlbum,
  setToken,
  setTopArtistEver,
  setTopArtistRecent,
  setTopTrackEver,
  setTopTrackRecent,
  setUser,
  topArtistEverIsLoading,
  topArtistRecentIsLoading,
  topTrackEverIsLoading,
  topTrackRecentIsLoading,
  userIsLoading,
} from "../../redux/actions/spotifyAction";
import {
  EXPIRED_TOKEN,
  INVALID_TOKEN,
} from "../../redux/constants/spotifyConstants";
import {
  spotifyGetFollowingArtist,
  spotifyGetSavedAlbum,
  spotifyGetTopArtists,
  spotifyGetTopTracks,
  spotifyGetUserProfile,
  spotifyRefreshToken,
} from "./Axios";
import { TimeRangeType } from "./constants";

const getUserAndCheckToken = async (
  access_token: string,
  refresh_token: string,
  history: any
) => {
  let errorHappened = false;
  await spotifyGetUserProfile(access_token)
    .then((res) => {
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      userIsLoading(false);
    })
    .catch(async (err) => {
      if (err?.response?.data?.error?.message === INVALID_TOKEN) {
        clearStore();
        history.replace("/login");
        errorHappened = true;
      } else if (err?.response?.data?.error?.message === EXPIRED_TOKEN) {
        if (!refresh_token) {
          clearStore();
          notification("error", "Please loggin again", () =>
            history.replace("/login")
          );
          errorHappened = true;
        }
        await spotifyRefreshToken(refresh_token)
          .then(async (res) => {
            access_token = setToken(res.data.access_token);
            await spotifyGetUserProfile(access_token)
              .then((res) => {
                setUser(res.data);
              })
              .finally(() => userIsLoading(false));
          })
          .catch(() => {
            clearStore();
            notification("error", "Please loggin again", () =>
              history.replace("/login")
            );
            errorHappened = true;
          });
      }
      if (err.message === "Network Error") {
        notification("warning", "You are in offline mode");
        const localData = localStorage.getItem("user");
        if (localData) setUser(JSON.parse(localData));
        userIsLoading(false);
      }
    });
  return errorHappened;
};

export const fillSpotifyData = async (
  access_token: string,
  refresh_token: string,
  history: any
) => {
  if (
    (await getUserAndCheckToken(access_token, refresh_token, history)) === true
  )
    return;
  spotifyGetFollowingArtist(access_token, 50)
    .then((res) => {
      setFollowingArtist(res.data.artists.items);
      localStorage.setItem(
        "followingArtist",
        JSON.stringify(res.data.artists.items)
      );
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        const localData = localStorage.getItem("followingArtist");
        if (localData) setFollowingArtist(JSON.parse(localData));
      } else notification("error", "Can't load following artist");
      console.error(err);
    })
    .finally(() => followingArtistIsLoading(false));
  spotifyGetSavedAlbum(access_token, 50)
    .then((res) => {
      setSavedAlbum(res.data.items);
      localStorage.setItem("savedAlbum", JSON.stringify(res.data.items));
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        const localData = localStorage.getItem("savedAlbum");
        if (localData) setSavedAlbum(JSON.parse(localData));
      } else notification("error", "Can't load saved album");
      console.error(err);
    })
    .finally(() => savedAlbumIsLoading(false));
  spotifyGetTopArtists(access_token, TimeRangeType.SHORT, 50)
    .then((res) => {
      setTopArtistRecent(res.data.items);
      localStorage.setItem("topArtistRecent", JSON.stringify(res.data.items));
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        const localData = localStorage.getItem("topArtistRecent");
        if (localData) setTopArtistRecent(JSON.parse(localData));
      } else notification("error", "Can't load your top artist");
    })
    .finally(() => topArtistRecentIsLoading(false));
  spotifyGetTopArtists(access_token, TimeRangeType.LONG, 50)
    .then((res) => {
      setTopArtistEver(res.data.items);
      localStorage.setItem("topArtistEver", JSON.stringify(res.data.items));
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        const localData = localStorage.getItem("topArtistEver");
        if (localData) setTopArtistEver(JSON.parse(localData));
      } else notification("error", "Can't load your top artist");
    })
    .finally(() => topArtistEverIsLoading(false));
  spotifyGetTopTracks(access_token, TimeRangeType.SHORT, 50)
    .then((res) => {
      setTopTrackRecent(res.data.items);
      localStorage.setItem("topTrackRecent", JSON.stringify(res.data.items));
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        const localData = localStorage.getItem("topTrackRecent");
        if (localData) setTopTrackRecent(JSON.parse(localData));
      } else notification("error", "Can't load your top recent top track");
    })
    .finally(() => topTrackRecentIsLoading(false));
  spotifyGetTopTracks(access_token, TimeRangeType.LONG, 50)
    .then((res) => {
      setTopTrackEver(res.data.items);
      localStorage.setItem("topTrackEver", JSON.stringify(res.data.items));
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        const localData = localStorage.getItem("topTrackEver");
        if (localData) setTopTrackEver(JSON.parse(localData));
      } else notification("error", "Can't load your ever top track");
    })
    .finally(() => topTrackEverIsLoading(false));
};
