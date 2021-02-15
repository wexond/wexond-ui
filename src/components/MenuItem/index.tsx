import React from 'react';

import { ICON_ARROW_RIGHT } from '~/constants/icons';
import { useMenuItem } from '~/menu/use-menu-item';
import { mergeEvents, mergeRefs } from '~/utils/react';
import { MenuListProps, MENU_PADDING_Y } from '../MenuList';
import {
  IconContainer,
  Label,
  StyledMenuItem,
  SubmenuIcon,
  Accelerator,
} from './style';

export interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode;
  accelerator?: string;
  leftSpacing?: string;
  rightSpacing?: string;
  submenu?: React.ElementType<MenuListProps>;
}

export const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>(
  (
    {
      icon,
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

    const _submenu = React.useMemo(() => {
      if (!item.isSubmenuOpened || !submenu) return null;
      return React.cloneElement(
        submenu as any,
        {
          x: item.itemRef.current!.clientWidth,
          y: item.itemRef.current!.offsetTop - MENU_PADDING_Y,
        } as MenuListProps,
      );
    }, [item.isSubmenuOpened, item.itemRef, submenu]);

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
          {submenu && (
            <SubmenuIcon
              boxSize="32px"
              iconSize="16px"
              src={ICON_ARROW_RIGHT}
              opacity={0.8}
              invert
            />
          )}
          {_submenu}
        </StyledMenuItem>
      </>
    );
  },
);

MenuItem.defaultProps = {
  leftSpacing: '32px',
};
