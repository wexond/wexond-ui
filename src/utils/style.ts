export const getMeasurement = (value: number | string) => {
  return typeof value === 'number' ? `${value}px` : value;
};
