import React from 'react';

import { useMenuItem } from '../../menu/use-menu-item';
import { mergeEvents, mergeRefs } from '../../utils/merge';
import {
  IconContainer,
  Label,
  StyledMenuItem,
  Accelerator,
  SubmenuIconContainer,
} from './style';

export interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode;
  submenuIcon?: React.ReactNode;
  accelerator?: string;
  leftSpacing?: string;
  rightSpacing?: string;
  submenu?: React.ReactNode;
  isDisabled?: boolean;
  onSelect?: () => void;
}

export const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>(
  (
    {
      icon,
      submenuIcon,
      accelerator,
      leftSpacing,
      rightSpacing,
      submenu,
      children,
      onSelect,
      onMouseUp,
      onMouseEnter,
      onMouseLeave,
      isDisabled,
      ...props
    },
    ref,
  ) => {
    const item = useMenuItem(!!submenu, onSelect, isDisabled);

    return (
      <StyledMenuItem
        ref={mergeRefs(item.ref, ref)}
        {...mergeEvents({
          onMouseEnter: [onMouseEnter, item.props.onMouseEnter],
          onMouseLeave: [onMouseLeave, item.props.onMouseLeave],
          onMouseUp: [onMouseUp, item.props.onMouseUp],
        })}
        isDisabled={isDisabled}
        {...props}
      >
        {icon && <IconContainer>{icon}</IconContainer>}
        <Label leftSpacing={leftSpacing} isDisabled={isDisabled}>
          {children}
        </Label>
        <Accelerator>{accelerator}</Accelerator>
        {submenu && <SubmenuIconContainer>{submenuIcon}</SubmenuIconContainer>}
        {item.isSubmenuOpen && submenu}
      </StyledMenuItem>
    );
  },
);

MenuItem.defaultProps = {
  leftSpacing: '32px',
};
