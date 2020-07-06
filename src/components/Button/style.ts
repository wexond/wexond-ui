import styled, { css } from 'styled-components';

import { ITheme } from '~/interfaces';
import { centerBothFlex } from '~/mixins/positioning';

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
  overflow: hidden;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  will-change: transform;
  transition: 0.1s transform;
  ${centerBothFlex()};

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

  ${({ background, foreground, outlined, theme }: Props) => {
    const _background = background || theme['control.background'];
    const _foreground = foreground || theme['control.foreground'];

    return css`
      color: ${_foreground};
      background: ${outlined ? 'transparent' : _background};

      ${outlined &&
      css`
        border: 1px solid ${_background};
      `}

      ${theme.animations &&
      css`
        &:active {
          transform: scale(0.95);
        }
      `}

      &::before {
        background-color: ${_foreground};
      }
    `;
  }};
`;

export const Container = styled.div`
  z-index: 1;
  font-size: 12px;
  pointer-events: none;
`;
