import React from 'react';

import { getMeasurement } from './style';

export const setPosition = (
  x: number | string,
  y: number | string,
  ...items: Array<HTMLElement | null>
) => {
  const _x = getMeasurement(x);
  const _y = getMeasurement(y);

  items.forEach((el) => {
    if (!el) return;
    el.style.left = _x;
    el.style.top = _y;
  });
};

export const setSize = (
  width: number | string,
  height: number | string,
  ...items: Array<HTMLElement | null>
) => {
  const _width = getMeasurement(width);
  const _height = getMeasurement(height);

  items.forEach((el) => {
    if (!el) return;
    el.style.width = _width;
    el.style.height = _height;
  });
};

export const setTranslate = (
  x: number | string | null | undefined,
  y: number | string | null | undefined,
  ...items: Array<HTMLElement | null>
) => {
  const _x = getMeasurement(x);
  const _y = getMeasurement(y);

  items.forEach((el) => {
    if (!el) return;
    const fragments: string[] = [];

    if (x != null) fragments.push(`translateX(${_x})`);
    if (y != null) fragments.push(`translateY(${_y})`);

    el.style.transform = fragments.join(' ');
  });
};

export const clearFields = (
  ...refs: React.MutableRefObject<
    HTMLInputElement | HTMLTextAreaElement | null
  >[]
) => {
  refs.forEach((r) => {
    if (r.current) r.current.value = '';
  });
};

export const openFilePicker = (input?: HTMLInputElement) => {
  if (!input) return;

  if (input.type !== 'file') {
    throw new Error('Input does not accept files');
  }

  input.click();
};
