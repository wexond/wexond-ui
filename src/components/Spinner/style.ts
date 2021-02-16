import styled, { css, keyframes } from 'styled-components';

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

  ${({ indeterminate }: { indeterminate?: boolean }) =>
    indeterminate &&
    css`
      animation: ${rotationAnimation} 1.35s linear infinite;
    `};
`;

export const SpinnerContainer = styled.div`
  z-index: 5;

  ${({
    size,
    indeterminate,
  }: {
    size?: number;
    indeterminate?: boolean;
  }) => css`
    width: ${size}px;
    height: ${size}px;
  `};
`;

export const Path = styled.circle`
  stroke-linecap: square;
  transform-origin: center;

  ${({ value, indeterminate }: { value?: number; indeterminate?: boolean }) =>
    indeterminate
      ? css`
          stroke-dasharray: 180;
          animation: ${turnAnimation} 1.35s ease-in-out infinite;
        `
      : css`
          stroke-dasharray: 360;
          stroke-dashoffset: ${value ? `${180 - value * 180}px` : ''};
        `};
`;
