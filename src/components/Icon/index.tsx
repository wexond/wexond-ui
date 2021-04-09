import React from 'react';

import { StyledIcon, ICON_VAR_URL, ICON_VAR_SIZE } from './style';

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  color?: string;
  boxSize?: string | number;
  boxWidth?: string | number;
  boxHeight?: string | number;
  iconSize?: string | number;
  opacity?: number;
  invert?: boolean;
  useMask?: boolean;
}

export const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  (
    {
      src,
      color,
      boxSize,
      boxWidth,
      boxHeight,
      iconSize,
      opacity,
      invert,
      useMask,
      style,
      ...props
    },
    ref,
  ) => {
    const _style: React.CSSProperties = {
      width: boxWidth ?? boxSize,
      height: boxHeight ?? boxSize,
      opacity,
      [ICON_VAR_URL]: `url(${src})`,
      [ICON_VAR_SIZE]: iconSize ?? 'center',
    } as any;

    if (invert) {
      _style.filter = 'invert(100%)';
    }

    if (color && useMask) {
      _style.backgroundColor = color;
    }

    return (
      <StyledIcon
        ref={ref}
        useMask={useMask}
        style={{ ..._style, ...style }}
        {...props}
      />
    );
  },
);

Icon.defaultProps = {
  color: '#000',
  boxSize: '16px',
  iconSize: '16px',
};

export { StyledIcon } from './style';
