import styled, { css, keyframes } from 'styled-components';

import { createComponent } from '~/theme/create-component';

export default {
  sizes: {
    small: css`
      width: 16px;
      height: 16px;
    `,
    md: css`
      width: 48px;
      height: 48px;
    `,
  },
  variants: {},
};

export const SpinnerContainer = createComponent('div', 'Spinner');

const turnAnimation = keyframes`
  0% {
    stroke-dashoffset: 180;
  }

  50% {
    stroke-dashoffset: 45;
    transform: rotate(90deg);
  }

  100% {
    stroke-dashoffset: 180;
    transform: rotate(360deg);
  }
`;

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const StyledSpinner = styled.svg`
  transform-origin: center;
  animation: ${rotationAnimation} 1.35s linear infinite;
`;

export const Path = styled.circle`
  stroke-linecap: square;
  transform-origin: center;
  stroke-dasharray: 180;
  animation: ${turnAnimation} 1.35s ease-in-out infinite;
`;
