import styled, { css } from 'styled-components';

import { ITheme } from '~/interfaces';
import { BLUE_500 } from '~/constants/colors';
import { transparency } from '~/constants/transparency';
import { robotoRegular } from '~/mixins/typography';
import { centerBoth } from '~/mixins/positioning';
import { ICON_CHECKED } from '~/constants/icons';
import { centerIcon } from '~/mixins/images';

export const StyledRadioButton = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Container = styled.div`
  width: 18px;
  height: 18px;
  position: relative;
`;

export const Circle = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${centerBoth()};

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

  &::before {
    content: '';
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    position: absolute;
    border-radius: 100%;
    background-color: #fff;
    transition: 0.2s transform;
  }

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    -webkit-font-smoothing: antialiased;
    background-image: url(${ICON_CHECKED});
    filter: invert(100%);
    transition-delay: 0.1s;
    ${centerIcon(20)};
  }
`;

export const Label = styled.div`
  font-size: 14px;
  margin-left: 16px;
  color: rgba(0, 0, 0, ${transparency.text.high});
  ${robotoRegular()};
`;
