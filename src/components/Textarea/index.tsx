import React from 'react';

import { ComponentProps } from '../../core/component';
import { useVariant } from '../../core/use-variant';
import { VariantTypes } from '../../core/variants';
import TEXTAREA_VARIANTS from './style';

export type TextareaVariants = VariantTypes<typeof TEXTAREA_VARIANTS>;

export interface TextareaProps
  extends React.HTMLAttributes<HTMLTextAreaElement>,
    ComponentProps {
  variant?: TextareaVariants;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant, as, ...props }, ref) => {
    const Root = useVariant(variant, TEXTAREA_VARIANTS, as);

    return <Root ref={ref} {...props} />;
  },
);

Textarea.defaultProps = {
  variant: 'filled',
};

export * from './style';
