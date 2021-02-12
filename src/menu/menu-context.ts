import React from 'react';

import { useMenu } from './use-menu';
import { useMenuList } from './use-menu-list';

export const MenuContext = React.createContext<ReturnType<
  typeof useMenu
> | null>(null);

export const MenuListContext = React.createContext<ReturnType<
  typeof useMenuList
> | null>(null);
