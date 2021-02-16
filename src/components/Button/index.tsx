import React from 'react';

import { ComponentProps } from '../..//system/create-component';
import { StyledButton, ButtonIcon } from './style';

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    ComponentProps<'Button'> {
  rightIcon?: React.ReactNode;
  iconSpacing?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, rightIcon, iconSpacing, children, ...props }, ref) => {
    return (
      <StyledButton ref={ref} variant={variant} {...props}>
        {children}
        {rightIcon && (
          <ButtonIcon spacing={iconSpacing}>{rightIcon}</ButtonIcon>
        )}
      </StyledButton>
    );
  },
);
