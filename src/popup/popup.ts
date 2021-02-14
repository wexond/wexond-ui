export type PopupHorizontalPlacement = 'left' | 'center' | 'right';

export type PopupVerticalPlacement = 'top' | 'center' | 'bottom';

export type PopupOverflow = 'none' | 'parent' | 'viewport';

export interface PopupPosition {
  x: number;
  y: number;
  horizontalPlacement: PopupHorizontalPlacement;
  verticalPlacement: PopupVerticalPlacement;
  relative: boolean;
}

export interface PopupPositionerOptions {
  width: number;
  height: number;

  marginX?: number;
  marginY?: number;

  /** Horizontal position in viewport */
  parentX?: number;
  /** Vertical position in viewport */
  parentY?: number;

  parentWidth?: number;
  parentHeight?: number;

  viewportWidth?: number;
  viewportHeight?: number;

  horizontalPlacement?: PopupHorizontalPlacement;
  verticalPlacement?: PopupVerticalPlacement;

  overflowFallback?: PopupOverflow;

  /** Popup is relative to it's parent */
  relative?: boolean;
}

export const getPopupPosition = ({
  width = 0,
  height = 0,
  marginX = 0,
  marginY = 0,
  parentX = 0,
  parentY = 0,
  parentWidth = 0,
  parentHeight = 0,
  viewportWidth = window.innerWidth,
  viewportHeight = window.innerHeight,
  horizontalPlacement = 'left',
  verticalPlacement = 'top',
  relative = false,
  overflowFallback = 'viewport',
}: PopupPositionerOptions): PopupPosition => {
  let _x = 0;
  let _y = 0;

  const parentLeft = parentX;
  const parentRight = parentLeft + parentWidth;

  let correctedXPlacement = horizontalPlacement;

  // From left to right
  if (horizontalPlacement === 'left') {
    if (!relative) {
      _x = parentRight + marginX;

      if (_x + width > viewportWidth) {
        _x =
          overflowFallback === 'viewport'
            ? viewportWidth - width
            : parentX - width - marginX;
        correctedXPlacement = 'right';
      }
    } else {
      _x = parentWidth + marginX;

      if (parentLeft + _x + width > viewportWidth) {
        _x = -width - marginX;
        correctedXPlacement = 'right';
      }
    }
  } // From Right to left
  else if (horizontalPlacement === 'right') {
    if (!relative) {
      _x = parentX - width - marginX;

      if (_x < 0) {
        _x = overflowFallback === 'viewport' ? 0 : parentRight + marginX;
        correctedXPlacement = 'left';
      }
    } else {
      _x = -width - marginX;

      if (parentLeft + _x < 0) {
        _x = parentWidth + marginX;
        correctedXPlacement = 'left';
      }
    }
  }

  return { x: _x, y: _y, horizontalPlacement: correctedXPlacement } as any;
};
