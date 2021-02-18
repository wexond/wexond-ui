import React from 'react';

import { StyledFormControl, FormLabel } from './style';

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactElement | string;
  spacing?: string;
  horizontal?: boolean;
}

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ label, horizontal, spacing, children, ...props }, ref) => {
    return (
      <StyledFormControl ref={ref} horizontal={horizontal} {...props}>
        <FormLabel horizontal={horizontal} spacing={spacing}>
          {label}
        </FormLabel>
        {children}
      </StyledFormControl>
    );
  },
);

FormControl.defaultProps = {
  spacing: '12px',
  horizontal: false,
};
