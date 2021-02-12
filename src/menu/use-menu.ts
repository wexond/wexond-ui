import React from 'react';

import { PopupXPosition } from '~/popup/popup-utils';

export interface MenuListData {
  id?: number;
  ref?: React.MutableRefObject<HTMLUListElement | null>;
  activeItem?: MenuItemData;
  xPosRef?: React.MutableRefObject<PopupXPosition | null>;
  onChildListMouseEnter?: () => void;
}

export interface MenuItemData {
  ref?: React.MutableRefObject<HTMLLIElement | null>;
  toggleSubmenu?: React.Dispatch<React.SetStateAction<boolean>>;
  hasSubmenu?: boolean;
}

export const useMenu = () => {
  const visibleLists = React.useRef<MenuListData[]>([]);
  const hideTimer = React.useRef<number | null>(null);

  return { visibleLists, hideTimer };
};
