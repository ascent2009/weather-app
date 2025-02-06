export const convertTemp = (temp: number) =>
  temp && Math.round((temp - 32) / 1.8);
