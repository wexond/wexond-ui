import styled, { css } from 'styled-components';

import { noUserSelect } from '../../mixins/user-selection';

export const TRACK_MARGIN = 3;
const TRACK_SIZE = 12;

export const StyledScrollable = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;

  ${({ isHorizontal }: { isHorizontal?: boolean }) =>
    isHorizontal &&
    css`
      flex-direction: column;
    `}
`;

export const Container = styled.div`
  overflow: hidden;
  ${noUserSelect};
`;

export const ScrollThumb = styled.div`
  width: 1px;
  background-color: var(--scrollableThumb-background);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  margin: 0px auto;
  will-change: transform;
  transition: 0.1s background-color, 0.1s width, 0.1s height;

  &:hover {
    background-color: var(--scrollableThumb-background-hover);
  }

  &:active {
    background-color: var(--scrollableThumb-background-active);
  }

  ${({ isHorizontal }: { isHorizontal?: boolean }) =>
    isHorizontal &&
    css`
      height: 1px;
      width: unset;
      margin: auto 0px;
    `}
`;

export const ScrollTrack = styled.div`
  margin: 3px;
  padding: 3px;
  flex-shrink: 0;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  background-color: var(--scrollableTrack-background);
  transition: 0.1s background-color;

  &:hover {
    background-color: var(--scrollableTrack-background-hover);
  }

  ${({ isHorizontal }: { isHorizontal?: boolean }) =>
    css`
      ${isHorizontal ? 'height' : 'width'}: ${TRACK_SIZE}px;

      &:hover > ${ScrollThumb}, ${ScrollThumb}:active {
        ${isHorizontal ? 'height' : 'width'}: ${TRACK_MARGIN * 2}px;
      }
    `}
`;
