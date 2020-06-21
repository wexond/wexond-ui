import * as React from 'react';

import { Path, StyledPreloader, Spinner } from './style';

export interface PreloaderProps {
  style?: any;
  color?: string;
  thickness?: number;
  size?: number;
}

export const Preloader = ({
  style,
  color,
  size,
  thickness,
}: PreloaderProps) => {
  return (
    <div style={style}>
      <StyledPreloader size={size}>
        <Spinner color={color} viewBox="0 0 66 66">
          <Path
            fill="none"
            strokeWidth={thickness}
            strokeLinecap="square"
            cx="33"
            cy="33"
            r="30"
          ></Path>
        </Spinner>
      </StyledPreloader>
    </div>
  );
};

Preloader.defaultProps = {
  size: 48,
  thickness: 4,
} as PreloaderProps;
