import React from 'react';

import { ButtonIcon, StyledButton } from './style';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  rightIcon?: React.ReactNode;
  iconSpacing?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ rightIcon, iconSpacing, children, ...props }, ref) => {
    return (
      <StyledButton ref={ref} {...props}>
        {children}
        {rightIcon && (
          <ButtonIcon spacing={iconSpacing}>{rightIcon}</ButtonIcon>
        )}
      </StyledButton>
    );
  },
);
