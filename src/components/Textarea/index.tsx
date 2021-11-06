import React from 'react';

import { ComponentProps } from '../../core/component';
import { useVariant } from '../../core/use-variant';
import { VariantTypes } from '../../core/variants';
import { getHelperText } from '../Input';
import { InputContainer, HelperText } from '../Input/style';
import TEXTAREA_VARIANTS from './style';

export type TextareaVariants = VariantTypes<typeof TEXTAREA_VARIANTS>;

export interface TextareaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ComponentProps {
  placeholder?: string | undefined;
  variant?: TextareaVariants;
  error?: undefined | string | boolean;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant, as, error, placeholder, helperText, ...props }, ref) => {
    const Root = useVariant(variant, TEXTAREA_VARIANTS, as);

    const text = getHelperText(error, helperText);

    return (
      <InputContainer {...props}>
        <Root ref={ref} isError={error} placeholder={placeholder} />
        {text && <HelperText isError={!!error}>{text}</HelperText>}
      </InputContainer>
    );
  },
);

Textarea.defaultProps = {
  variant: 'filled',
};

export * from './style';
