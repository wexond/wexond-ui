import React from 'react';

import { ComponentProps } from '../../core/component';
import { useVariant } from '../../core/use-variant';
import { VariantTypes } from '../../core/variants';
import INPUT_VARIANTS, { StyledInput } from './style';

export type InputVariants = VariantTypes<typeof INPUT_VARIANTS>;

export interface InputProps
  extends React.HTMLAttributes<HTMLInputElement>,
    ComponentProps {
  variant?: InputVariants;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, as, ...props }, ref) => {
    const Root = useVariant(variant, INPUT_VARIANTS, as);

    return <Root ref={ref} {...props} />;
  },
);

Input.defaultProps = {
  variant: 'filled',
};

export * from './style';
