import React from 'react';
import { useItems } from '~/hooks/use-items';

import { PopupXPosition } from '~/popup/popup-utils';

export interface MenuListData {
  id: number;
  ref?: React.MutableRefObject<HTMLUListElement | null>;
  xPosition?: React.MutableRefObject<PopupXPosition | null>;
  activeItem?: MenuItemData | null; // MenuItemData;
  setActiveItem?: React.Dispatch<React.SetStateAction<MenuItemData | null>>;
  unselect: () => void;
  reselect: () => void;
}

export interface MenuItemData {
  id: number;
  ref?: React.MutableRefObject<HTMLLIElement | null>;
  toggleSubmenu?: React.Dispatch<React.SetStateAction<boolean>>;
  hasSubmenu?: boolean;
}

export const useMenu = () => {
  const itemMouseTimer = React.useRef<NodeJS.Timeout | null>(null);

  const {
    items: visibleLists,
    addItem: addVisibleList,
    removeItem: removeVisibleList,
  } = useItems<MenuListData>();

  const clearItemMouseTimer = React.useCallback(() => {
    if (itemMouseTimer.current != null) {
      clearTimeout(itemMouseTimer.current);
    }
  }, []);

  return {
    visibleLists,
    addVisibleList,
    removeVisibleList,
    itemMouseTimer,
    clearItemMouseTimer,
  };
};
