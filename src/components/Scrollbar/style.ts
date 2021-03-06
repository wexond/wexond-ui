import styled, { css } from 'styled-components';
import { getMeasurement } from '../../utils/style';

const getSize = (
  { horizontal }: any,
  size: string | number,
  variant: 'thickness' | 'length' = 'thickness',
) => {
  if (
    (horizontal && variant === 'thickness') ||
    (!horizontal && variant === 'length')
  )
    return `height: ${getMeasurement(size)};`;
  return `width: ${getMeasurement(size)};`;
};

interface ScrollbarThumbProps {
  horizontal?: boolean;
}

export const ScrollbarThumb = styled.div<ScrollbarThumbProps>`
  transition: 0.1s width, 0.1s height, 0.1s opacity;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  &:active {
    background-color: rgba(255, 255, 255, 1);
  }
  ${(props) => css`
    ${getSize(props, '1px')};
  `};
`;

interface ScrollTrackProps {
  horizontal?: boolean;
  hoveredThumbSize: string | number;
}

export const ScrollTrack = styled.div<ScrollTrackProps>`
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.1s background-color;
  ${(props) => css`
    ${getSize(props, `100%`, 'length')}
    ${getSize(props, `calc(${getMeasurement(props.hoveredThumbSize)} + 6px)`)}
  `}
`;

interface ScrollThumbContainerProps {
  horizontal?: boolean;
}

export const ScrollThumbContainer = styled.div<ScrollThumbContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 3px;
  ${(props) => css`
    ${getSize(props, `calc(100% - 6px)`, 'length')}
    ${getSize(props, `100%`, 'thickness')}
  `}
`;

interface ScrollbarProps {
  size: string | number;
  horizontal?: boolean;
  hoveredThumbSize: string | number;
}

export const StyledScrollbar = styled.div<ScrollbarProps>`
  position: relative;
  ${(props) => css`
    ${getSize(props, props.size)}
    ${getSize({ horizontal: !props.horizontal }, '100%')}
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      ${ScrollbarThumb} {
        ${getSize(props, props.hoveredThumbSize)};
      }
      ${ScrollTrack} {
        background-color: rgba(255, 255, 255, 0.08);
      }
    }
  `};
`;
