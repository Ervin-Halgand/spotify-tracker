import { shuffleArray } from "./shuffleChart";

export const formatArtist = (artist: any) => {
  let names: string[] = [];
  let value: Number[] = [];
  const { innerWidth: width } = window;
  let slicedNumber = 7;
  if (artist.length >= 5 && width < 1000) slicedNumber = 5;

  let length: number = artist.length;
  const recusriveShuffle = 7;
  artist.forEach((item: any, i: Number) => {
    names.push(item.name);
    value.push(length);
    length--;
  });

  if (artist.length >= slicedNumber) {
    names = names.slice(0, slicedNumber);
    value = value.slice(0, slicedNumber);
  } else {
    names = names.slice(0, names.length);
    value = value.slice(0, names.length);
  }
  names = shuffleArray(names, recusriveShuffle);
  value = shuffleArray(value, recusriveShuffle);
  return { artist: names, value: value };
};
