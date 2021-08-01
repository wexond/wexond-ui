import React from 'react';

import { ComponentProps } from '../../core/component';
import { useVariant } from '../../core/use-variant';
import { VariantTypes } from '../../core/variants';
import { mergeRefs } from '../../utils/merge';
import BUTTON_VARIANTS, { ButtonIcon, ButtonSpinner } from './style';

export type ButtonVariants = VariantTypes<typeof BUTTON_VARIANTS>;

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    ComponentProps {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  spinner?: React.ReactElement;
  loadingText?: React.ReactElement | string;
  isLoading?: boolean;
  iconSpacing?: string;
  disabledIconEvents?: boolean;
  isDisabled?: boolean;
  variant?: ButtonVariants;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      leftIcon,
      rightIcon,
      isLoading,
      spinner,
      loadingText,
      iconSpacing,
      disabledIconEvents,
      children,
      isDisabled,
      variant,
      as,
      ...props
    },
    ref,
  ) => {
    const _ref = React.useRef<HTMLElement | null>(null);

    const Root = useVariant(variant, BUTTON_VARIANTS, as);

    React.useEffect(() => {
      if (isDisabled) _ref.current?.blur();
    }, [isDisabled]);

    return (
      <Root ref={mergeRefs(_ref, ref)} isDisabled={isDisabled} {...props}>
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
      </Root>
    );
  },
);

Button.defaultProps = {
  iconSpacing: '8px',
  disabledIconEvents: true,
  variant: 'contained',
};

export * from './style';
