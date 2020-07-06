import styled, { css } from 'styled-components';

import { ITheme } from '~/interfaces';
import { centerBothFlex } from '~/mixins/positioning';
import { ICON_CHECKED } from '~/constants/icons';
import { centerIcon } from '~/mixins/images';

export const StyledCheckbox = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:active > .checkbox-box {
    transform: scale(0.9);
  }
`;

export const Box = styled.div`
  width: 18px;
  height: 18px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  will-change: transform;
  transition: 0.1s transform;
  ${centerBothFlex()};

  ${({ selected, theme }: { selected: boolean; theme?: ITheme }) => css`
    background: ${selected
      ? theme['accentColor']
      : theme['radiobutton.backgroundColor']};

    &::before {
      transform: ${selected ? `scale(0)` : 'scale(1)'};
    }

    &::after {
      clip-path: ${selected ? 'inset(0 0 0 0)' : 'inset(100% 50% 0 50%)'};
      transition: ${selected
        ? '1s clip-path cubic-bezier(0.19, 1, 0.22, 1)'
        : 'unset'};
    }
  `}

  &::before, &::after {
    content: '';
    position: absolute;
  }

  &::before {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-radius: 2px;
    background-color: #fff;
    will-change: transform;
    transition: 0.2s transform;
  }

  &::after {
    width: 100%;
    height: 100%;
    -webkit-font-smoothing: antialiased;
    background-image: url(${ICON_CHECKED});
    filter: invert(100%);
    will-change: clip-path;
    transition-delay: 0.1s;
    ${centerIcon(18)};
  }
`;
