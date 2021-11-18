import React from 'react';

import { ComponentProps } from '../../core/component';
import { StyledIconButton } from './style';

export interface IconButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ComponentProps {
  isDisabled?: boolean;
  isActive?: boolean;
  dense?: boolean;
}

export const IconButton = React.forwardRef<HTMLDivElement, IconButtonProps>(
  ({ isDisabled, isActive, dense, as, ...props }, ref) => {
    const Root = as || StyledIconButton;

    return (
      <Root
        ref={ref}
        isActive={isActive}
        isDisabled={isDisabled}
        dense={dense}
        {...props}
      />
    );
  },
);

export * from './style';
