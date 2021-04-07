import { setRecommandation } from "../../redux/actions/recommandationAction";
import { notification } from "../../redux/actions/userLoginAction";

export const getRecommandationBuilder = (
  dispatch: any,
  data: any,
) => {
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
  dispatch(setRecommandation(artists_seed, genre, tracks_seed[0]));
};
