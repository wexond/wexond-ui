import styled, { css } from 'styled-components';

import { ITheme } from '~/interfaces';
import { transparency } from '~/constants/transparency';
import { robotoRegular } from '~/mixins/typography';
import { ICON_CHECKED } from '~/constants/icons';
import { centerIcon } from '~/mixins/images';
import { centerBothFlex } from '~/mixins/positioning';

export const StyledRadioButton = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Circle = styled.div`
  width: 18px;
  height: 18px;
  position: relative;
  border-radius: 100%;
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
    border-radius: 100%;
    background-color: #fff;
    transition: 0.2s transform;
  }

  &::after {
    width: 100%;
    height: 100%;
    -webkit-font-smoothing: antialiased;
    background-image: url(${ICON_CHECKED});
    filter: invert(100%);
    transition-delay: 0.1s;
    ${centerIcon(18)};
  }
`;

export const Label = styled.div`
  font-size: 14px;
  margin-left: 12px;
  color: rgba(0, 0, 0, ${transparency.text.high});
  ${robotoRegular()};
`;
