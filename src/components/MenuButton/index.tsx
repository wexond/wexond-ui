import React from 'react';

import { ComponentProps } from '../../core/component';
import { MenuContext } from '../../menu/menu-context';
import { useMenuButton } from '../../menu/use-menu-button';
import { mergeEvents, mergeRefs } from '../../utils/merge';
import { Button, ButtonProps } from '../Button';

export interface MenuButtonProps extends ButtonProps, ComponentProps {}

export const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ as, onMouseDown, onKeyDown, ...props }, ref) => {
    const menu = React.useContext(MenuContext);
    const btn = useMenuButton();

    const ButtonComponent = as || Button;

    return (
      <ButtonComponent
        ref={mergeRefs(ref, menu?.buttonRef)}
        {...mergeEvents({
          onMouseDown: [onMouseDown, btn.props.onMouseDown],
          onKeyDown: [onKeyDown, btn.props.onKeyDown],
        })}
        {...props}
      />
    );
  },
);
