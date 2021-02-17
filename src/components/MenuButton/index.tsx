import React from 'react';

import { MenuContext } from '../../menu/menu-context';
import { useMenuButton } from '../../menu/use-menu-button';
import { mergeEvents, mergeRefs } from '../../utils/react';
import { Button, ButtonProps } from '../Button';

export interface MenuButtonProps extends ButtonProps {
  as?: React.ElementType;
}

export const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ as, onMouseDown, ...props }, ref) => {
    const menu = React.useContext(MenuContext);
    const btn = useMenuButton();

    const ButtonComponent = as || Button;

    return (
      <ButtonComponent
        ref={mergeRefs(ref, menu?.buttonRef)}
        onMouseDown={mergeEvents(onMouseDown, btn.props.onMouseDown)}
        onKeyDown={btn.props.onKeyDown}
        {...props}
      ></ButtonComponent>
    );
  },
);
