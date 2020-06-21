import * as React from 'react';

import { ITheme } from '~/interfaces';
import { Path, StyledPreloader, Spinner } from './style';

export interface PreloaderProps {
  style?: any;
  color?: string;
  thickness?: number;
  size?: number;
  indeterminate?: boolean;
}

export const Preloader = ({
  style,
  color,
  size,
  thickness,
  indeterminate,
  theme,
}: PreloaderProps & { theme: ITheme }) => {
  return (
    <div style={style}>
      <StyledPreloader size={size}>
        <Spinner
          stroke={color || theme['accentColor']}
          viewBox="0 0 66 66"
          indeterminate={indeterminate}
        >
          <Path
            indeterminate={indeterminate}
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
  thickness: 4,
  size: 48,
} as PreloaderProps;
