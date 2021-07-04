import React from 'react';

import { MenuContext } from '../../menu/menu-context';
import { useMenu } from '../../menu/use-menu';
import { PopupPlacement } from '../../popup/popup';

export interface MenuProps {
  onOpen?: () => void;
  onClose?: () => void;
  marginX?: number;
  marginY?: number;
  placement?: PopupPlacement;
  isVisibleByDefault?: boolean;
  maxWidth?: number;
  maxHeight?: number;
  onMount?: () => void;
  onUnmount?: () => void;
}

export const Menu: React.FC<MenuProps> = ({
  onMount,
  onUnmount,
  children,
  ...props
}) => {
  const ctx = useMenu(props);

  const _children =
    typeof children === 'function'
      ? children({ isOpen: ctx.isOpen })
      : children;

  React.useEffect(() => {
    onMount?.();
    return () => onUnmount?.();
  }, [onMount, onUnmount]);

  return <MenuContext.Provider value={ctx}>{_children}</MenuContext.Provider>;
};

Menu.defaultProps = {
  marginY: 2,
  isVisibleByDefault: false,
};
