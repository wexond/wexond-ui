import styled, { css } from 'styled-components';

export interface IconProps {
  src: string;
  color?: string;
  boxSize?: string;
  boxWidth?: string;
  boxHeight?: string;
  iconSize?: string;
  opacity?: number;
  invert?: boolean;
  useMask?: boolean;
}

export const Icon = styled.div`
  ${({
    src,
    color,
    boxSize,
    boxWidth,
    boxHeight,
    iconSize,
    opacity,
    invert,
    useMask,
  }: IconProps) => css`
    width: ${boxWidth ?? boxSize};
    height: ${boxHeight ?? boxSize};

    ${
      useMask
        ? css`
            mask-image: url(${src});
            mask-position: center;
            mask-repeat: no-repeat;
            mask-size: ${iconSize ?? 'center'};
            background-color: ${color};
          `
        : css`
            background-image: url(${src});
            background-position: center;
            background-repeat: no-repeat;
            background-size: ${iconSize ?? 'center'};
          `
    }
    opacity: ${opacity};

    ${
      invert &&
      css`
        filter: invert(100%);
      `
    }
  `}
`;

Icon.defaultProps = {
  color: '#000',
  boxSize: '16px',
  iconSize: '16px',
};
