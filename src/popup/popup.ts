export type PopupPlacement =
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';

export interface PopupPosition {
  x: number;
  y: number;
  placement: PopupPlacement;
  relative: boolean;
}

export interface PopupPositionerOptions {
  width: number;
  height: number;

  marginX: number;
  marginY: number;

  /** Horizontal position in viewport */
  parentX: number;
  /** Vertical position in viewport */
  parentY: number;

  parentWidth: number;
  parentHeight: number;

  viewportWidth: number;
  viewportHeight: number;

  placement: PopupPlacement;

  /** Popup is relative to it's parent */
  relative: boolean;
}

const getOppositeXPlacement = (placement: PopupPlacement): PopupPlacement => {
  const [x, y] = placement.split('-');

  return `${x === 'right' ? 'left' : 'right'}-${y}` as PopupPlacement;
};

const getOppositeYPlacement = (placement: PopupPlacement): PopupPlacement => {
  const [x, y] = placement.split('-');

  return `${x}-${y === 'start' ? 'end' : 'start'}` as PopupPlacement;
};

const calculateXPos = (
  placement: PopupPlacement,
  {
    width,
    marginX,
    parentX: parentLeft,
    parentWidth,
    relative,
  }: PopupPositionerOptions,
) => {
  const parentRight = parentLeft + parentWidth;

  if (placement.startsWith('right')) {
    return parentRight + marginX;
  } else if (placement.startsWith('left')) {
    return parentLeft - width - marginX;
  }

  // if (placement.startsWith('right')) {
  //   return !relative ? parentRight + marginX : parentWidth + marginX;
  // } else if (placement.startsWith('left')) {
  //   return !relative ? parentLeft - width - marginX : 0;
  // }

  return null;
};

const calculateYPos = (
  placement: PopupPlacement,
  {
    height,
    parentY: parentTop,
    parentHeight,
    relative,
  }: PopupPositionerOptions,
) => {
  const parentBottom = parentTop + parentHeight;

  if (placement.endsWith('start')) {
    return parentTop;
  } else if (placement.endsWith('end')) {
    return parentBottom - height;
  }

  return null;
};

export const getPopupPosition = (
  opts: Partial<PopupPositionerOptions>,
): PopupPosition => {
  const {
    width = 0,
    height = 0,
    marginX = 0,
    marginY = 0,
    parentX: parentLeft = 0,
    parentY: parentTop = 0,
    parentWidth = 0,
    parentHeight = 0,
    viewportWidth = window.innerWidth,
    viewportHeight = window.innerHeight,
    placement,
    relative = false,
  } = opts;

  let correctedPlacement = placement;

  const parentRight = parentLeft + parentWidth;
  const parentBottom = parentTop + parentHeight;

  let _x = calculateXPos(placement, opts);
  let _y = calculateYPos(placement, opts);

  if (
    (placement?.startsWith('right') && _x + width > viewportWidth) ||
    (placement?.startsWith('left') && _x < 0)
  ) {
    correctedPlacement = getOppositeXPlacement(placement);
    _x = calculateXPos(correctedPlacement, opts);
  }

  if (
    (placement?.endsWith('start') && _y + height > viewportHeight) ||
    (placement?.endsWith('end') && _y < 0)
  ) {
    correctedPlacement = getOppositeYPlacement(placement);
    _y = calculateYPos(correctedPlacement, opts);
  }

  return { x: _x, y: _y, placement: correctedPlacement } as any;
};
