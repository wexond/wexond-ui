import React from 'react';

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
  icon?: React.ReactElement;
  submenuIcon?: React.ReactElement;
  accelerator?: string;
  leftSpacing?: string;
  rightSpacing?: string;
  submenu?: React.ReactNode;
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
      onClick,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
    const item = useMenuItem(!!submenu, onSelect);

    return (
      <>
        <StyledMenuItem
          ref={mergeRefs(item.ref, ref)}
          isSelected={item.isHovered}
          onMouseEnter={mergeEvents(onMouseEnter, item.props.onMouseEnter)}
          onMouseLeave={mergeEvents(onMouseLeave, item.props.onMouseLeave)}
          onClick={mergeEvents(onClick, item.props.onClick)}
          {...props}
        >
          {icon && <IconContainer>{icon}</IconContainer>}
          <Label leftSpacing={leftSpacing}>{children}</Label>
          <Accelerator>{accelerator}</Accelerator>
          {submenu && (
            <SubmenuIconContainer>{submenuIcon}</SubmenuIconContainer>
          )}
          {item.isSubmenuOpen && submenu}
        </StyledMenuItem>
      </>
    );
  },
);

MenuItem.defaultProps = {
  leftSpacing: '32px',
};
