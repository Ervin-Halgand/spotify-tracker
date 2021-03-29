import { shuffleArray } from "../../../../helpers/chart/shuffleChart";

export const countGenre = (items: any) => {
  const genres: any[] = [];
  let tmpGenreName: string[] = [];
  let tmpValue: Number[] = [];
  const { innerWidth: width } = window;

  items?.forEach((item: any) => {
    item?.genres.forEach((genre: any) => {
      genres.filter((e) => e.genre === genre).length > 0
        ? genres?.forEach((elem: any) => {
            if (elem.genre === genre) elem.count++;
          })
        : genres.push({ genre: genre, count: 1 });
    });
  });
  let slicedArray = genres.sort((a, b) => a.count - b.count).reverse();
  if (slicedArray.length >= 10) slicedArray = slicedArray.slice(0, 10);
  else slicedArray = slicedArray.slice(0, slicedArray.length);
  if (slicedArray.length >= 5 && width < 1000)
    slicedArray = slicedArray.slice(0, 5);
  else if (width < 1000) slicedArray = slicedArray.slice(0, slicedArray.length);
  slicedArray.forEach((item) => {
    tmpGenreName.push(item.genre);
    tmpValue.push(item.count);
  });
  tmpValue = shuffleArray(tmpValue, 1);
  tmpGenreName = shuffleArray(tmpGenreName, 1);
  return {
    genre: tmpGenreName,
    value: tmpValue,
  };
};
