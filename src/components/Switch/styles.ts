import styled, { css } from 'styled-components';

import { ITheme } from '~/interfaces';
import { centerVertical } from '~/mixins/positioning';

interface Props {
  activated: boolean;
  color: string;
  dense: boolean;
  theme?: ITheme;
}

export const StyledSwitch = styled.div`
  border-radius: 32px;
  position: relative;
  overflow: hidden;
  will-change: background-color;
  transition: 0.15s background-color;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }

  ${({ dense, activated, color, theme }: Props) => css`
    width: ${dense ? 32 : 36}px;
    height: ${dense ? 16 : 18}px;
    background-color: ${activated ? color : theme['switch.backgroundColor']};

    &:hover:after {
      background-color: ${!activated && theme.dark
        ? 'rgba(0, 0, 0, 0.06)'
        : 'rgba(255, 255, 255, 0.12)'};
    }
  `}
`;

export const Thumb = styled.div`
  border-radius: 100%;
  position: absolute;
  z-index: 3;
  background-color: #fff;
  will-change: left;
  transition: 0.15s left;
  ${centerVertical()};

  ${({ activated, dense }: { activated: boolean; dense: boolean }) => css`
    width: ${dense ? 12 : 14}px;
    height: ${dense ? 12 : 14}px;
    left: ${activated ? (dense ? 18 : 20) : 2}px;
  `}
`;
