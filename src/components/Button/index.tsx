import React from 'react';

import { ComponentProps } from '../../theme/create-component';
import ButtonTheme, { StyledButton, ButtonIcon } from './style';

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    ComponentProps<typeof ButtonTheme> {
  rightIcon?: React.ReactElement;
  iconSpacing?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, rightIcon, iconSpacing, children, ...props }, ref) => {
    return (
      <StyledButton ref={ref} variant={variant} size={size} {...props}>
        {children}
        {rightIcon && (
          <ButtonIcon spacing={iconSpacing}>{rightIcon}</ButtonIcon>
        )}
      </StyledButton>
    );
  },
);

Button.defaultProps = {
  variant: 'contained',
  size: 'md',
};
