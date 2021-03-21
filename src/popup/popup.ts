export type PopupPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end';

export interface PopupInfo {
  x: number;
  y: number;
  maxWidth: number;
  maxHeight: number;
  placement: PopupPlacement;
  relative: boolean;
}

export interface PopupOptions {
  width: number;
  height: number;

  maxWidth?: number;
  maxHeight?: number;

  marginX?: number;
  marginY?: number;

  insetX?: number;
  insetY?: number;

  /** Horizontal position in viewport */
  parentTop: number;
  /** Vertical position in viewport */
  parentLeft: number;

  parentWidth: number;
  parentHeight: number;

  viewportWidth?: number;
  viewportHeight?: number;

  placement?: PopupPlacement;

  /** Popup is relative to it's parent */
  relative?: boolean;
}

const getOppositeXPlacement = (placement: PopupPlacement): PopupPlacement => {
  switch (placement) {
    case 'right':
      return 'left';
    case 'left':
      return 'right';
    case 'left-start':
      return 'right-start';
    case 'right-start':
      return 'left-start';
    case 'left-end':
      return 'right-end';
    case 'right-end':
      return 'left-end';
    case 'top-start':
      return 'top-end';
    case 'bottom-start':
      return 'bottom-end';
    case 'top-end':
      return 'top-start';
    case 'bottom-end':
      return 'bottom-start';
    default:
      return placement;
  }
};

const getOppositeYPlacement = (placement: PopupPlacement): PopupPlacement => {
  switch (placement) {
    case 'top':
      return 'bottom';
    case 'bottom':
      return 'top';
    case 'top-start':
      return 'bottom-start';
    case 'bottom-start':
      return 'top-start';
    case 'top-end':
      return 'bottom-end';
    case 'bottom-end':
      return 'top-end';
    case 'right-end':
      return 'right-start';
    case 'right-start':
      return 'right-end';
    default:
      return placement;
  }
};

const calculateXPos = (
  placement: PopupPlacement,
  width: number,
  marginX: number,
  parentWidth: number,
  parentLeft: number,
) => {
  switch (placement) {
    case 'top':
    case 'bottom':
      return parentLeft + (parentWidth + width) / 2 - width;
    case 'left':
    case 'left-start':
    case 'left-end':
      return parentLeft - width - marginX;
    case 'right':
    case 'right-start':
    case 'right-end':
      return parentLeft + parentWidth + marginX;
    case 'top-start':
    case 'bottom-start':
      return parentLeft + marginX;
    case 'top-end':
    case 'bottom-end':
      return parentLeft + parentWidth - width;
  }
};

const calculateYPos = (
  placement: PopupPlacement,
  height: number,
  marginY: number,
  parentHeight: number,
  parentTop: number,
) => {
  switch (placement) {
    case 'left':
    case 'right':
      return parentTop + (parentHeight + height) / 2 - height;
    case 'top':
    case 'top-start':
    case 'top-end':
      return parentTop - height - marginY;
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      return parentTop + parentHeight + marginY;
    case 'left-start':
    case 'right-start':
      return parentTop + marginY;
    case 'left-end':
    case 'right-end':
      return parentTop + parentHeight - height;
  }
};

export const getPopupPosition = ({
  width,
  height,
  marginX = 0,
  marginY = 0,
  insetX = 0,
  insetY = 0,
  parentLeft,
  parentTop,
  parentWidth,
  parentHeight,
  viewportWidth = window.innerWidth,
  viewportHeight = window.innerHeight,
  placement = 'bottom',
  relative = false,
  maxWidth,
  maxHeight,
}: PopupOptions): PopupInfo => {
  let _placement = placement;

  let _maxWidth = maxWidth;
  let _maxHeight = maxHeight;

  let x = calculateXPos(placement, width, marginX, parentWidth, parentLeft);
  let y = calculateYPos(placement, height, marginY, parentHeight, parentTop);

  const _x = x;
  const _y = y;

  if (x + width > viewportWidth || x < 0) {
    _placement = getOppositeXPlacement(placement);
    if (_placement === placement)
      throw new Error(`Unsupported case ${placement}`);
    x = calculateXPos(_placement, width, marginX, parentWidth, parentLeft);

    if (x < 0) {
      x = _x;
      _maxWidth = _maxWidth ?? window.innerWidth - _x - insetX;
    }
  }

  if (y < 0 || y + height > viewportHeight) {
    _placement = getOppositeYPlacement(placement);
    if (_placement === placement)
      throw new Error(`Unsupported case ${placement}`);

    y = calculateYPos(_placement, height, marginY, parentHeight, parentTop);

    if (y < 0) {
      y = _y;
      _maxHeight = window.innerHeight - _y - insetY;
    }
  }

  if (relative) {
    x -= parentLeft;
    y -= parentTop;
  }

  return {
    x,
    y,
    maxWidth: _maxWidth ?? width,
    maxHeight: _maxHeight ?? height,
    placement: _placement,
    relative,
  };
};
