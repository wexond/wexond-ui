import styled, { css } from 'styled-components';

import { ITheme } from '~/interfaces';
import { BLUE_500 } from '~/constants/colors';
import { transparency } from '~/constants/transparency';
import { robotoRegular } from '~/mixins/typography';

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

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    border-radius: 100%;
    box-sizing: border-box;
    pointer-events: none;
    z-index: 0;
  }
`;

export const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 100%;
  pointer-events: none;
  z-index: 1;
  transform: translate(-50%, -50%);
  transition: width 0.1s ease-in, height 0.1s ease-in;

  ${({ selected, theme }: { selected: boolean; theme?: ITheme }) => css`
    width: ${selected ? `calc(100% - 8px)` : 0};
    height: ${selected ? `calc(100% - 8px)` : 0};
    background: ${selected ? BLUE_500 : 'rgba(0, 0, 0, 0.54)'};

    &::before {
      transition: ${selected ? `opacity 0.5s ease` : 'none'};
      content: '';
      width: calc(20px - 6px);
      position: absolute;
      height: calc(20px - 6px);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 2px solid
        ${selected
          ? BLUE_500
          : theme.dark
          ? 'rgba(255, 255, 255, 0.54)'
          : 'rgba(0, 0, 0, 0.54)'};
      border-radius: 100%;
    }
  `}
`;

export const Label = styled.div`
  font-size: 14px;
  margin-left: 16px;
  color: rgba(0, 0, 0, ${transparency.text.high});
  ${robotoRegular()};
`;
