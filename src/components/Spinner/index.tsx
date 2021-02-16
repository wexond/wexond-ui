import React from 'react';

import { Path, StyledSpinner, SpinnerContainer } from './style';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  thickness?: number;
  size?: number;
  indeterminate?: boolean;
  value?: number;
}

export const Spinner = ({
  color,
  size,
  thickness,
  value,
  indeterminate,
  ...props
}: SpinnerProps) => {
  return (
    <SpinnerContainer indeterminate={indeterminate} size={size} {...props}>
      <StyledSpinner
        stroke={color}
        viewBox="0 0 66 66"
        indeterminate={indeterminate}
      >
        <Path
          indeterminate={indeterminate}
          value={value}
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
};

Spinner.defaultProps = {
  thickness: 4,
  size: 48,
  color: 'red',
  indeterminate: true,
};
