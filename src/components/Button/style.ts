import styled, { css } from 'styled-components';

import { ITheme } from '~/interfaces';

interface Props {
  background: string;
  foreground: string;
  outlined: boolean;
  theme?: ITheme;
}

export const StyledButton = styled.div`
  min-width: 80px;
  width: fit-content;
  height: 32px;
  padding: 0px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  will-change: transform;
  transition: 0.1s transform;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0;
    position: absolute;
    will-change: background-color;
    transition: 0.2s background-color;
  }

  &:hover::before {
    opacity: 0.12;
  }

  ${({ background, foreground, outlined, theme }: Props) => css`
    color: ${foreground || theme['control.foreground']};

    ${!outlined
      ? css`
          background-color: ${background || theme['control.background']};
        `
      : css`
          border: 1px solid ${background || theme['control.background']};
          background: transparent;
        `}

    &::before {
      background-color: ${foreground || theme['control.foreground']};
    }

    ${theme.animations &&
    css`
      &:active {
        transform: scale(0.95);
      }
    `}
  `};
`;

export const Container = styled.div`
  z-index: 1;
  font-size: 12px;
  pointer-events: none;
`;
