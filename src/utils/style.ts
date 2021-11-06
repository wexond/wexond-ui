export const getMeasurement = (value?: number | string | null) => {
  if (value == null) return '';
  return typeof value === 'number' ? `${value}px` : value;
};
