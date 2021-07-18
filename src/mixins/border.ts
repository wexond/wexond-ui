import { css } from 'styled-components';

export const borderShadow = (color: string, thickness = '1px') => css`
  box-shadow: 0 0 0 ${thickness} ${color};
`;
