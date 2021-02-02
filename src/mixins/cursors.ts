import { css } from 'styled-components';

export const pointer = css`
  user-select: none;
  cursor: pointer;
`;

export const defaultCursor = css`
  user-select: none;
  cursor: default;
`;

export const coloredCursor = (cursorColor: string, textColor = '#000') => css`
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 0px 0px ${textColor};
  color: ${cursorColor};
`;
