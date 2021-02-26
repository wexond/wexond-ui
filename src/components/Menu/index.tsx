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
}

export const Menu: React.FC<MenuProps> = ({ children, ...props }) => {
  const ctx = useMenu(props);

  const _children =
    typeof children === 'function'
      ? children({ isOpen: ctx.isOpen })
      : children;

  return <MenuContext.Provider value={ctx}>{_children}</MenuContext.Provider>;
};

Menu.defaultProps = {
  placement: 'bottom-start',
  marginY: 2,
  isVisibleByDefault: false,
};
