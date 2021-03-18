export const getDistance = (xa: number, ya: number, xb: number, yb: number) => {
  return Math.sqrt((xa - xb) ** 2 + (ya - yb) ** 2);
};
