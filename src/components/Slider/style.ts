import styled from 'styled-components';

import { centerBoth } from '../../mixins/positioning';
import { noUserSelect } from '../../mixins/user-selection';

export const SLIDER_HEIGHT = 4;
export const SLIDER_HANDLE_SIZE = 10;

export const SliderHandle = styled.div`
  position: absolute;
  width: ${SLIDER_HANDLE_SIZE}px;
  height: ${SLIDER_HANDLE_SIZE}px;
  border-radius: 100%;
  background-color: var(--ui-slider-color);

  &::before {
    content: '';
    display: block;
    width: 0px;
    height: 0px;
    background-color: var(--ui-slider-handle-background);
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
  background-color: var(--ui-slider-color);
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
    background-color: var(--ui-slider-track-background);
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
      background-color: var(--ui-slider-hover-background);
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
