import { css } from 'styled-components';

export const noUserSelect = () => css`
  user-select: none;
`;

export const noTapHighlight = () => css`
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important;
`;
