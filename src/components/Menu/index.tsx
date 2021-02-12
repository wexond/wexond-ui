import React from 'react';

import { MenuContext } from '~/menu/menu-context';
import { useMenu } from '~/menu/use-menu';

export interface MenuProps {
  onOpen?: (listRef: HTMLUListElement) => void;
  beforeClose?: (...listRef: HTMLUListElement[]) => void;
}

export const Menu: React.FC<MenuProps> = ({
  onOpen,
  beforeClose,
  children,
}) => {
  // const ctx = useMenu({ onOpen, beforeClose });
  const ctx = useMenu();

  return <MenuContext.Provider value={ctx}>{children}</MenuContext.Provider>;
};
