import React from 'react';

import { ComponentProps } from '../../theme/create-component';
import InputTheme, { StyledInput } from './style';

export interface InputProps
  extends React.HTMLAttributes<HTMLInputElement>,
    ComponentProps<typeof InputTheme> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, size, ...props }, ref) => {
    return <StyledInput ref={ref} _variant={variant} _size={size} {...props} />;
  },
);

Input.defaultProps = {
  variant: 'filled',
  size: 'md',
};
