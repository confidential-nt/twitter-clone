export const getTimeDiff = (timestamp: number) => {
  const now = new Date();
  const diff = now.getTime() - timestamp;

  let result: string = "";

  let sec = 0;
  let min = 0;
  let hour = 0;
  let day = 0;

  if (diff < 1000) return "방금";

  sec = Math.floor(diff / 1000);

  if (sec < 60) {
    return sec + "초 전";
  }

  min = Math.floor(diff / 60000);

  if (min < 60) {
    return min + "분 전";
  }

  hour = Math.floor(diff / 3600000);

  if (hour < 24) {
    return hour + "시간 전";
  }

  day = Math.floor(diff / 86400000);

  if (day < 7) {
    return day + "일 전";
  }

  result =
    now.getFullYear() +
    "년 " +
    (now.getMonth() + 1) +
    "월 " +
    now.getDate() +
    "일 ";

  return result;
};

export const getTimeStampArr = (count: number) => {
  const arr: string[] = [];
  for (let i = 0; i < count; i++) {
    arr[i] = Math.round(Math.random() * Date.now()).toString();
  }
  return arr;
};
