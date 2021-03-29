import {
  notification,
  setRecommandation,
  setRecommandationLoading,
  setRecommandationModal,
} from "../../redux/actions/spotifyAction";
import { spotifyGetRecommandation } from "./Axios";

export const getRecommandationBuilder = (data: any, access_token: string) => {
  let tracks_seed: any[] = [];
  let artists_seed: any[] = [];
  let genre: any[] = [];
  data.topTrack.recent.track.forEach((track: any) => {
    track.artists.forEach((artist: any) => {
      artists_seed.push(artist.id);
    });
    tracks_seed.push(track.id);
  });
  data.topArtist.recent.artist.forEach((artist: any) => {
    genre = genre.concat(artist.genres);
  });
  genre = genre.filter((item, index) => genre.indexOf(item) === index);
  if (artists_seed.length >= 2) artists_seed = artists_seed.slice(0, 2);
  if (genre.length >= 2) genre = genre.slice(0, 2);
  if (artists_seed.length < 2 || genre.length < 2 || tracks_seed.length < 1) {
    notification(
      "warning",
      "Can't load recommandation. Please listen more on spotify"
    );
    return;
  }
  setRecommandationLoading(true);
  spotifyGetRecommandation(access_token, artists_seed, genre, tracks_seed[0])
    .then((res) => {
      setRecommandation(res.data.tracks);
      setRecommandationModal(true);
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        notification("warning", "Connect to internet to see recommandation");
      }
      console.error(err);
    })
    .finally(() => setRecommandationLoading(false));
};
