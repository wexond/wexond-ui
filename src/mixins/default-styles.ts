import { css, createGlobalStyle } from 'styled-components';
import { noUserSelect } from './user-selection';
import { body2 } from './typography';

export const baseStyle = css`
  html,
  body {
    width: 100%;
    height: 100%;
    user-select: none;
    cursor: default;
    margin: 0;
    padding: 0;
    ${noUserSelect()};
    ${body2()};
  }

  * {
    box-sizing: border-box;
  }
`;

export const UIStyle = createGlobalStyle`${baseStyle}`;
