import React from 'react';

import { ComponentProps } from '../../theme/create-component';
import ButtonTheme, { StyledButton, ButtonIcon, ButtonSpinner } from './style';

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    ComponentProps<typeof ButtonTheme> {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  spinner?: React.ReactElement;
  loadingText?: React.ReactElement | string;
  isLoading?: boolean;
  iconSpacing?: string;
  disabledIconEvents?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      leftIcon,
      rightIcon,
      isLoading,
      spinner,
      loadingText,
      iconSpacing,
      disabledIconEvents,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledButton ref={ref} _variant={variant} _size={size} {...props}>
        {leftIcon && !isLoading && (
          <ButtonIcon
            iconSpacing={iconSpacing}
            disabledIconEvents={disabledIconEvents}
            left
          >
            {leftIcon}
          </ButtonIcon>
        )}
        {isLoading && (
          <>
            <ButtonSpinner iconSpacing={loadingText && iconSpacing}>
              {spinner}
            </ButtonSpinner>
            {loadingText}
          </>
        )}
        {!isLoading && children}
        {rightIcon && !isLoading && (
          <ButtonIcon
            iconSpacing={iconSpacing}
            disabledIconEvents={disabledIconEvents}
          >
            {rightIcon}
          </ButtonIcon>
        )}
      </StyledButton>
    );
  },
);

Button.defaultProps = {
  variant: 'contained',
  size: 'md',
  iconSpacing: '8px',
  disabledIconEvents: true,
};
