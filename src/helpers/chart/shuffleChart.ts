export const shuffleArray = (array: any[], recursiveTime: number) => {
  let recursiveTimeHandler: number = recursiveTime - 1;
  let length = array.length - 1;
  for (let i = 0; i < array.length; i++) {
    if (i % 2) continue;
    let lastElement = array[length];
    array[length] = array[i];
    array[i] = lastElement;
    length--;
  }
  if (recursiveTimeHandler !== 0) shuffleArray(array, recursiveTimeHandler);
  return array;
};
