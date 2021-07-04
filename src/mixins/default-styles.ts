import { css } from 'styled-components';

import { robotoRegular } from './typography';

export const baseStyle = css`
  body {
    width: 100%;
    height: 100vh;
    cursor: default;
    margin: 0;
    padding: 0;
    ${robotoRegular};
  }

  * {
    box-sizing: border-box;
  }
`;
