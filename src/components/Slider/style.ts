import styled from 'styled-components';

import { centerBoth } from '../../mixins/positioning';
import { noUserSelect } from '../../mixins/user-selection';
import colors from '../../theme/colors';

export const SLIDER_HEIGHT = 4;
export const SLIDER_HANDLE_SIZE = 10;

export const SliderHandle = styled.div`
  position: absolute;
  width: ${SLIDER_HANDLE_SIZE}px;
  height: ${SLIDER_HANDLE_SIZE}px;
  border-radius: 100%;
  background-color: ${colors.blue.dark};

  &::before {
    content: '';
    display: block;
    width: 0px;
    height: 0px;
    background-color: rgba(255, 255, 255, 0.12);
    border-radius: 100%;
    z-index: -1;
    position: relative;
    will-change: width, height;
    transition-property: width, height;
    transition-duration: 0.15s;
    ${centerBoth};
  }
`;

export const SliderTrack = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${colors.blue.dark};
  will-change: width;
  border-radius: 32px;
`;

export const StyledSlider = styled.div`
  width: 100%;
  height: ${SLIDER_HEIGHT}px;
  position: relative;
  will-change: left;
  ${noUserSelect};

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.08);
    border-radius: 32px;
    transition: 0.15s background-color;
  }

  &:focus {
    outline: none;

    & ${SliderHandle}::before {
      width: 28px;
      height: 28px;
    }
  }

  &:hover {
    &::before,
    & ${SliderHandle}::before {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

export const SliderBackgroundTrack = styled.div`
  width: calc(100% - ${SLIDER_HEIGHT}px);
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;
