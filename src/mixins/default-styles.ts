import { css } from 'styled-components';

import { robotoRegular } from './typography';

export const baseStyle = css`
  body {
    width: 100%;
    height: 100vh;
    cursor: default;
    margin: 0;
    padding: 0;
    background-color: #212121;
    /* background-image: url('https://steamuserimages-a.akamaihd.net/ugc/940586530515504757/CDDE77CB810474E1C07B945E40AE4713141AFD76/'); */
    ${robotoRegular};
  }

  * {
    box-sizing: border-box;
  }
`;
