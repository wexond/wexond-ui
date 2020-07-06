export const getRippleSize = (
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  if (width === 0 || height === 0) {
    return 0;
  }

  // Calculate points relative to the center of a component.
  const newX = x - width / 2;
  const newY = y - height / 2;

  let result = 2 * Math.abs(newY) + Math.abs(newX);

  if (Math.abs(newX) > Math.abs(newY)) {
    result = 2 * Math.abs(newX) + Math.abs(newY);
  }

  return Math.max(width, height) + result + 10;
};
