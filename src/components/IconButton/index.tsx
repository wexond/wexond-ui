import React from 'react';

import { ComponentProps } from '../../core/component';
import { StyledIconButton, StyledIcon } from './style';

export interface IconButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ComponentProps {
  icon: string;
  iconSize?: string;
  isDisabled?: boolean;
  isActive?: boolean;
  dense?: boolean;
  autoInvert?: boolean;
}

export const IconButton = React.forwardRef<HTMLDivElement, IconButtonProps>(
  (
    { icon, iconSize, isDisabled, isActive, dense, autoInvert, as, ...props },
    ref,
  ) => {
    const Root = as || StyledIconButton;

    return (
      <Root
        ref={ref}
        isActive={isActive}
        isDisabled={isDisabled}
        dense={dense}
        autoInvert={autoInvert}
        {...props}
      >
        <StyledIcon
          src={icon}
          boxSize={iconSize}
          iconSize={iconSize}
          invert={autoInvert}
        />
      </Root>
    );
  },
);

IconButton.defaultProps = {
  autoInvert: true,
};

export * from './style';
