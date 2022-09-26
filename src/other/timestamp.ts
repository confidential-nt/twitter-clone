export const getTimeStampArr = (count: number) => {
  const arr: string[] = [];
  for (let i = 0; i < count; i++) {
    arr[i] = Math.round(Math.random() * Date.now()).toString();
  }
  return arr;
};
