import React from 'react';

import colors from '../../theme/colors';
import { ComponentProps } from '../../theme/create-component';
import SpinnerTheme, { Path, StyledSpinner, SpinnerContainer } from './style';

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ComponentProps<typeof SpinnerTheme> {
  thickness?: string;
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size, variant, color, thickness, ...props }, ref) => {
    return (
      <SpinnerContainer ref={ref} size={size} variant={variant} {...props}>
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
  size: 'md',
};
