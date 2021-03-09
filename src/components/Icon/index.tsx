import React from 'react';

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
    const prefix = useMask ? 'mask' : 'background';

    const _style: React.CSSProperties = {
      width: boxWidth ?? boxSize,
      height: boxHeight ?? boxSize,
      [`${prefix}Image`]: `url(${src})`,
      [`${prefix}Position`]: 'center',
      [`${prefix}Repeat`]: 'no-repeat',
      [`${prefix}Size`]: iconSize ?? 'center',
      opacity: opacity,
    };

    if (invert) {
      _style.filter = 'invert(100%)';
    }

    if (color && useMask) {
      _style.backgroundColor = color;
    }

    return <div ref={ref} style={{ ..._style, ...style }} {...props} />;
  },
);

Icon.defaultProps = {
  color: '#000',
  boxSize: '16px',
  iconSize: '16px',
};
