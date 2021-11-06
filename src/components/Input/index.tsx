import React from 'react';

import { ComponentProps } from '../../core/component';
import { useVariant } from '../../core/use-variant';
import { VariantTypes } from '../../core/variants';
import INPUT_VARIANTS, { InputContainer, HelperText } from './style';

export type InputVariants = VariantTypes<typeof INPUT_VARIANTS>;

export interface InputProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ComponentProps {
  variant?: InputVariants;
  helperText?: string;
  error?: undefined | string | boolean;
}

export const getHelperText = (
  error: undefined | string | boolean,
  helperText?: string,
) => {
  if (typeof error === 'string') {
    return error;
  }
  return helperText;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, error, placeholder, helperText, as, ...props }, ref) => {
    const Root = useVariant(variant, INPUT_VARIANTS, as);

    const text = getHelperText(error, helperText);

    return (
      <InputContainer {...props}>
        <Root ref={ref} isError={error} placeholder={placeholder} />
        {text && <HelperText isError={!!error}>{text}</HelperText>}
      </InputContainer>
    );
  },
);

Input.defaultProps = {
  variant: 'filled',
};

export * from './style';
