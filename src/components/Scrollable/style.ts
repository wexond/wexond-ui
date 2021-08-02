import styled from 'styled-components';

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
  background-color: var(--ui-scrollable-thumb-background);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  margin: auto 0px;
  will-change: transform;
  transition: 0.1s background-color, 0.1s width, 0.1s height;

  &:hover {
    background-color: var(--ui-scrollable-thumb-background-hovered);
  }

  &:active {
    background-color: var(--ui-scrollable-thumb-background-selected);
  }
`;

export const ScrollTrack = styled.div`
  height: 12px;
  width: calc(100% - 6px);
  margin: 3px;
  padding: 3px;
  flex-shrink: 0;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  background-color: var(--ui-scrollable-track-background);

  &:hover {
    background-color: var(--ui-scrollable-track-background-hovered);
  }

  &:hover > ${ScrollThumb}, ${ScrollThumb}:active {
    height: 6px;
  }
`;
