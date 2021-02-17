import React from 'react';

import { useMenuItem } from '../../menu/use-menu-item';
import { mergeEvents, mergeRefs } from '../../utils/react';
import { MenuListProps, MENU_PADDING_Y } from '../MenuList';
import {
  IconContainer,
  Label,
  StyledMenuItem,
  SubmenuIcon,
  Accelerator,
} from './style';

export interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  icon?: React.ReactElement;
  submenuIcon?: React.ReactElement;
  accelerator?: string;
  leftSpacing?: string;
  rightSpacing?: string;
  submenu?: React.ElementType<MenuListProps>;
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
      onClick,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
    const item = useMenuItem(!!submenu);

    return (
      <>
        <StyledMenuItem
          ref={mergeRefs(item.itemRef, ref)}
          isSelected={item.isSelected}
          onMouseEnter={mergeEvents(onMouseEnter, item.props.onMouseEnter)}
          onClick={mergeEvents(onClick, item.props.onClick)}
          {...props}
        >
          {icon && <IconContainer>{icon}</IconContainer>}
          <Label leftSpacing={leftSpacing}>{children}</Label>
          <Accelerator>{accelerator}</Accelerator>
          {submenu && submenuIcon}
          {item.isSubmenuOpened && submenu}
        </StyledMenuItem>
      </>
    );
  },
);

MenuItem.defaultProps = {
  leftSpacing: '32px',
};
