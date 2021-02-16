import React from 'react';

import { ComponentProps } from '../../theme/create-component';
import ButtonTheme, { StyledButton, ButtonIcon } from './style';

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    ComponentProps<typeof ButtonTheme> {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  iconSpacing?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, size, leftIcon, rightIcon, iconSpacing, children, ...props },
    ref,
  ) => {
    return (
      <StyledButton ref={ref} variant={variant} size={size} {...props}>
        {leftIcon && (
          <ButtonIcon spacing={iconSpacing} left>
            {leftIcon}
          </ButtonIcon>
        )}
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
  iconSpacing: '8px',
};
