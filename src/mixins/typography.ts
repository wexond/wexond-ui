import { css } from 'styled-components';

export const getLetterSpacing = (fontSize: number, tracking: number) =>
  tracking / fontSize;

export const robotoLight = () => css`
  font-family: Roboto;
  font-weight: 300;
`;

export const robotoRegular = css`
  font-family: Roboto;
  font-weight: 400;
`;

export const robotoMedium = css`
  font-family: Roboto;
  font-weight: 500;
`;

export const h1 = css`
  ${robotoLight()};
  letter-spacing: ${getLetterSpacing(96, -1.5)}rem;
  font-size: 96px;
`;

export const h2 = css`
  ${robotoLight()};
  letter-spacing: ${getLetterSpacing(60, -0.5)}rem;
  font-size: 60px;
`;

export const h3 = css`
  ${robotoRegular};
  letter-spacing: ${getLetterSpacing(48, 0)}rem;
  font-size: 48px;
`;

export const h4 = css`
  ${robotoRegular};
  letter-spacing: ${getLetterSpacing(34, 0.25)}rem;
  font-size: 34px;
`;

export const h5 = css`
  ${robotoRegular};
  letter-spacing: ${getLetterSpacing(24, 0)}rem;
  font-size: 24px;
`;

export const h6 = css`
  ${robotoMedium};
  letter-spacing: ${getLetterSpacing(20, 0.15)}rem;
  font-size: 20px;
`;

export const subtitle1 = css`
  ${robotoRegular};
  letter-spacing: ${getLetterSpacing(16, 0.15)}rem;
  font-size: 16px;
`;

export const subtitle2 = css`
  ${robotoMedium};
  letter-spacing: ${getLetterSpacing(14, 0.1)}rem;
  font-size: 14px;
`;

export const body1 = css`
  ${robotoRegular};
  letter-spacing: ${getLetterSpacing(16, 0.5)}rem;
  font-size: 16px;
`;

export const body2 = css`
  ${robotoRegular};
  letter-spacing: ${getLetterSpacing(14, 0.25)}rem;
  font-size: 14px;
`;

export const button = css`
  ${robotoMedium};
  letter-spacing: ${getLetterSpacing(14, 0.75)}rem;
  font-size: 14px;
`;

export const caption = css`
  ${robotoRegular};
  letter-spacing: ${getLetterSpacing(12, 0.4)}rem;
  font-size: 12px;
`;

export const overline = css`
  ${robotoRegular};
  letter-spacing: ${getLetterSpacing(10, 1.5)}rem;
  font-size: 10px;
  text-transform: uppercase;
`;

export const maxLines = (count: number) => css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${count};
  -webkit-box-orient: vertical;
`;
