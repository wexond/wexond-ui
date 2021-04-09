import React from 'react';

import { StyledIconButton, StyledIcon } from './style';

export interface IconButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string;
  iconSize?: string;
  isDisabled?: boolean;
  isActive?: boolean;
  dense?: boolean;
  autoInvert?: boolean;
}

export const IconButton = React.forwardRef<HTMLDivElement, IconButtonProps>(
  (
    { icon, iconSize, isDisabled, isActive, dense, autoInvert, ...props },
    ref,
  ) => {
    return (
      <StyledIconButton
        ref={ref}
        isActive={isActive}
        isDisabled={isDisabled}
        dense={dense}
        {...props}
      >
        <StyledIcon
          src={icon}
          boxSize={iconSize}
          iconSize={iconSize}
          invert={autoInvert}
        />
      </StyledIconButton>
    );
  },
);

export { StyledIconButton };

IconButton.defaultProps = {
  autoInvert: true,
};
