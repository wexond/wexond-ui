import styled, { css, keyframes } from 'styled-components';

const turnAnimation = keyframes`
  0% {
    stroke-dashoffset: 180;
  }

  50% {
    stroke-dashoffset: 45;
    transform: rotate(135deg);
  }

  100% {
    stroke-dashoffset: 180;
    transform: rotate(450deg);
  }
`;

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(270deg);
  }
`;

export const StyledPreloader = styled.div`
  z-index: 5;

  ${({ size }: { size: number }) => css`
    width: ${size}px;
    height: ${size}px;
  `};
`;

export const Spinner = styled.svg`
  transform-origin: center;

  ${({ indeterminate }: { indeterminate: boolean }) =>
    indeterminate &&
    css`
      animation: ${rotationAnimation} 1.35s linear infinite;
    `};
`;

export const Path = styled.circle`
  stroke-linecap: square;
  transform-origin: center;

  ${({ indeterminate }: { indeterminate: boolean }) => css`
    stroke-dasharray: ${indeterminate ? 180 : 0};
    animation: ${indeterminate
      ? `${turnAnimation} 1.35s ease-in-out infinite`
      : 'unset'};
  `};
`;
