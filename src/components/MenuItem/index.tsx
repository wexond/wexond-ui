import React from 'react';
import { MenuContext, MenuListContext } from '../../menu/menu-context';

import { useMenuItem } from '../../menu/use-menu-item';
import { mergeEvents, mergeRefs } from '../../utils/react';
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
      ...props
    },
    refx,
  ) => {
    const root = React.useContext(MenuContext);

    const {
      ref,
      props: { onMouseEnter, onFocus, onMouseLeave, onMouseUp },
      isSubmenuOpen,
    } = useMenuItem(!!submenu, onSelect);

    return (
      <StyledMenuItem
        ref={ref}
        tabIndex={-1}
        isDisabled={isDisabled}
        onMouseEnter={onMouseEnter}
        onFocus={onFocus}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        {...props}
      >
        {icon && <IconContainer>{icon}</IconContainer>}
        <Label leftSpacing={leftSpacing} isDisabled={isDisabled}>
          {children}
        </Label>
        <Accelerator>{accelerator}</Accelerator>
        {submenu && <SubmenuIconContainer>{submenuIcon}</SubmenuIconContainer>}
        {isSubmenuOpen && submenu}
      </StyledMenuItem>
    );
  },
);

MenuItem.defaultProps = {
  leftSpacing: '32px',
};
