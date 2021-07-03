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
      isDisabled,
      onMouseEnter,
      onFocus,
      onMouseLeave,
      onMouseUp,
      ...props
    },
    ref,
  ) => {
    const item = useMenuItem(!!submenu, onSelect);

    return (
      <StyledMenuItem
        ref={mergeRefs(ref, item.ref) as any}
        tabIndex={-1}
        isDisabled={isDisabled}
        {...mergeEvents({
          onMouseEnter: [onMouseEnter, item.props.onMouseEnter],
          onFocus: [onFocus, item.props.onFocus],
          onMouseLeave: [onMouseLeave, item.props.onMouseLeave],
          onMouseUp: [onMouseUp, item.props.onMouseUp],
        })}
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
