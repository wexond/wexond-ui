import { css } from 'styled-components';

export const centerIcon = (size: number | 'contain' = 'contain') => {
  let s: string = size.toString();

  if (typeof size === 'number') s += 'px';

  return css`
    background-size: ${s};
    background-position: center;
    background-repeat: no-repeat;
  `;
};

export const customImage = (
  width: string,
  height: string,
  left: string,
  top: string,
) => css`
  background-size: ${width} ${height};
  background-position: ${left} ${top};
  background-repeat: no-repeat;
`;

export const coverImage = css`
  background-size: cover;
  background-repeat: no-repeat;
`;
