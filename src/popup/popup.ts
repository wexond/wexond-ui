export type PopupHorizontalPlacement = 'left' | 'center' | 'right';

export type PopupVerticalPlacement = 'top' | 'top-start' | 'center' | 'bottom';

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
  parentX: parentLeft = 0,
  parentY: parentTop = 0,
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

  const parentRight = parentLeft + parentWidth;
  const parentBottom = parentTop + parentHeight;

  let correctedXPlacement = horizontalPlacement;
  let correctedYPlacement = verticalPlacement;

  // From left to right
  if (horizontalPlacement === 'left') {
    if (!relative) {
      _x = parentRight + marginX;

      if (_x + width > viewportWidth) {
        _x =
          overflowFallback === 'viewport'
            ? viewportWidth - width
            : parentLeft - width - marginX;
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
      _x = parentLeft - width - marginX;

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

  // From top to bottom
  if (verticalPlacement === 'top' || verticalPlacement === 'top-start') {
    if (!relative) {
      _y = parentBottom + marginY;

      if (_y + height > viewportHeight) {
        _y =
          overflowFallback === 'viewport'
            ? viewportHeight - height
            : parentTop - height - marginY;
        correctedYPlacement = 'bottom';
      }
    } else {
      _y = marginY;

      if (verticalPlacement === 'top') _y += parentHeight;

      if (parentTop + _y + height > viewportHeight) {
        _y = -height - marginY;
        correctedYPlacement = 'bottom';
      }
    }
  } // From Bottom to top
  else if (verticalPlacement === 'bottom') {
    if (!relative) {
      _y = parentTop - height - marginY;

      if (_y < 0) {
        _y = overflowFallback === 'viewport' ? 0 : parentBottom + marginY;
        correctedYPlacement = 'top';
      }
    } else {
      _y = -height - marginX;

      if (parentTop + _y < 0) {
        _y = parentHeight + marginY;
        correctedYPlacement = 'top';
      }
    }
  }

  return {
    x: _x,
    y: _y,
    horizontalPlacement: correctedXPlacement,
    verticalPlacement: correctedYPlacement,
  } as any;
};
