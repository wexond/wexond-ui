export type PopupXPosition = 'left' | 'right';

export type PopupYPosition = 'top' | 'bottom';

export interface PopupOptions {
  x: number;
  y: number;
  xMargin?: number;
  yMargin?: number;
  width: number;
  height: number;
  parentX?: number;
  parentWidth?: number;
  preferXPos?: PopupXPosition;
  preferYPos?: PopupYPosition;
  windowWidth?: number;
  windowHeight?: number;
  initialX?: number;
  initialY?: number;
}

export interface PopupSafePosition {
  x: number;
  y: number;
  xPos: PopupXPosition;
  yPos: PopupYPosition;
}

export const getPopupPosition = ({
  x,
  y,
  xMargin = 0,
  yMargin = 0,
  width,
  height,
  parentX,
  parentWidth = 0,
  preferXPos = 'right',
  preferYPos = 'top',
  windowWidth = window.innerWidth,
  windowHeight = window.innerHeight,
  initialX = 0,
  initialY = 0,
}: PopupOptions): PopupSafePosition => {
  let safeX = x;
  let safeY = y;

  let safeXPos: PopupXPosition = preferXPos;
  let safeYPos: PopupYPosition = preferYPos;

  if (preferXPos === 'right') {
    safeX += xMargin;

    if (x + width + xMargin + initialX > windowWidth) {
      safeXPos = 'left';

      if (parentX == null) {
        safeX = windowWidth - width - xMargin;
      } else {
        safeX = Math.max(parentX - width - xMargin, 0) - initialX;
      }
    }
  } else if (preferXPos === 'left') {
    safeX -= width + xMargin + parentWidth;

    if (x - width - xMargin + initialX - parentWidth < 0) {
      safeXPos = 'right';

      if (parentWidth == null || parentX == null) {
        safeX = xMargin;
      } else {
        safeX =
          Math.min(parentX + parentWidth + xMargin, windowWidth) - initialX;
      }
    }
  }

  if (preferYPos === 'top') {
    safeY += yMargin;

    if (y + height + yMargin > windowHeight) {
      safeYPos = 'bottom';
      safeY = windowHeight - height - yMargin;
    }
  } else if (preferYPos === 'bottom') {
    safeY -= height + yMargin;

    if (safeY < 0) {
      safeYPos = 'top';
      safeY = yMargin;
    }
  }

  return { x: safeX, y: safeY, xPos: safeXPos, yPos: safeYPos };
};
