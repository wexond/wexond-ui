import { createGlobalStyle, css } from "styled-components";

import { body2 } from "../../mixins";

export const Style = css`
  body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    cursor: default;
    overflow: hidden;
    background-color: #fff;
    user-select: none;
    ${body2()};
  }
  * {
    box-sizing: border-box;
  }
`;

export const GlobalStyle = createGlobalStyle`${Style}`;
