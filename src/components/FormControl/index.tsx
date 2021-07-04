import React from 'react';

import { StyledFormControl } from './style';

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactElement | string;
  spacing?: string;
  ySpacing?: string;
  vertical?: boolean;
}

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ label, vertical, children, ...props }, ref) => {
    return (
      <StyledFormControl ref={ref} vertical={vertical} {...props}>
        {children}
      </StyledFormControl>
    );
  },
);

FormControl.defaultProps = {
  spacing: '12px',
  ySpacing: '8px',
};
