export const unixTimeStamp = (value: string | number | Date) => {
  return Math.floor(new Date(value).getTime() / 1000);
};
