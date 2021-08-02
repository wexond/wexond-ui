import styled from 'styled-components';

import { centerHorizontal, centerVertical } from '../../mixins/positioning';
import { noUserSelect } from '../../mixins/user-selection';

export const SCROLLBAR_THUMB_MARGIN = 3;

export const StyledScrollable = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export const Container = styled.div`
  overflow: hidden;
  ${noUserSelect};
`;

export const ScrollThumb = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  overflow: hidden;
  will-change: transform;
  transition: 0.1s background-color, 0.1s width, 0.1s height;

  &:active {
    background-color: red;
  }
`;

export const ScrollTrack = styled.div`
  height: 12px;
  width: 100%;
  /* width: calc(100% - ${SCROLLBAR_THUMB_MARGIN * 2}px); */
  /* margin: ${SCROLLBAR_THUMB_MARGIN}px; */
  /* padding: 0px ${SCROLLBAR_THUMB_MARGIN}px; */
  flex-shrink: 0;
  position: relative;
  border-radius: 8px;
  display: flex;
  overflow: hidden;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.24);
  }

  &:hover > ${ScrollThumb} {
    height: 6px;
  }
`;
