import React from 'react';

import colors from '../../theme/colors';
import { Path, StyledSpinner, SpinnerContainer } from './style';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  thickness?: string;
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ color, thickness, ...props }, ref) => {
    return (
      <SpinnerContainer ref={ref} {...props}>
        <StyledSpinner stroke={color} viewBox="0 0 66 66">
          <Path
            fill="none"
            strokeWidth={thickness}
            strokeLinecap="square"
            cx="33"
            cy="33"
            r="30"
          ></Path>
        </StyledSpinner>
      </SpinnerContainer>
    );
  },
);

Spinner.defaultProps = {
  thickness: '4px',
  color: colors.blue['500'],
};
