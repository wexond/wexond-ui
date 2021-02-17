import React from 'react';

import { MenuContext } from '../../menu/menu-context';
import { useMenu } from '../../menu/use-menu';
import { PopupPlacement } from '../../popup/popup';

export interface MenuProps {
  onOpen?: (listRef: HTMLUListElement) => void;
  beforeClose?: (...listRef: HTMLUListElement[]) => void;
  placement?: PopupPlacement;
}

export const Menu: React.FC<MenuProps> = ({
  onOpen,
  beforeClose,
  placement,
  children,
}) => {
  const ctx = useMenu({ onOpen, beforeClose, placement });

  return <MenuContext.Provider value={ctx}>{children}</MenuContext.Provider>;
};

Menu.defaultProps = {
  placement: 'bottom',
};
