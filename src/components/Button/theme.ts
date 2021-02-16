import { css } from 'styled-components';

export const baseStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const textVariant = css`
  color: red;
`;

const outlinedVariant = css`
  border: 1px solid red;
`;

const variants = {
  textVariant,
  outlinedVariant,
};

const sizes = {
  md: {
    width: '32px',
    height: '64px',
    fontSize: '16px',
  },
};

export default {
  baseStyle,
  variants,
  sizes,
};
