import React from 'react';

import { MenuListController, useMenu } from './use-menu';
import { useMenuList } from './use-menu-list';

export const MenuContext = React.createContext<ReturnType<
  typeof useMenu
> | null>(null);

export const MenuListContext = React.createContext<MenuListController | null>(
  null,
);
