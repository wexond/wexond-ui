import React, { useMemo } from 'react';

import { ICON_ARROW_RIGHT } from '~/constants/icons';
// import { MenuListContext } from '~/menu/menu-context';
import { useMenuItem } from '~/menu/use-menu-item';
// import { MenuListContext } from '~/menu/menu-list-context';
// import { useMenuItem } from '~/menu/use-menu-item';
import { PopupXPosition } from '~/popup/popup-utils';
import { mergeEvents, mergeRefs } from '~/utils/react';
import { MenuListProps, MENU_PADDING_Y } from '../MenuList';
import {
  Accelerator,
  IconContainer,
  Label,
  StyledMenuItem,
  SubmenuIcon,
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
    // const list = React.useContext(MenuListContext);
    const item = useMenuItem(!!submenu);

    // const selected = list?.selectedItem?.ref.current === item.ref.current;

    const _submenu = React.useMemo(() => {
      if (!item.isSubmenuVisible || !submenu) return null;
      return React.cloneElement(
        submenu as any,
        {
          x: item.itemRef.current!.clientWidth,
          y: item.itemRef.current!.offsetTop - MENU_PADDING_Y,
        } as MenuListProps,
      );
    }, [item.isSubmenuVisible, item.itemRef, submenu]);

    return (
      <>
        <StyledMenuItem
          ref={mergeRefs(item.itemRef, ref)}
          isSelected={item.isSelected}
          onMouseEnter={mergeEvents(onMouseEnter, item.props.onMouseEnter)}
          onMouseLeave={mergeEvents(onMouseLeave, item.props.onMouseLeave)}
          onClick={mergeEvents(onClick, item.props.onClick)}
          tabIndex={-1}
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
        </StyledMenuItem>
        {_submenu}
      </>
    );
  },
);

MenuItem.defaultProps = {
  leftSpacing: '32px',
};
