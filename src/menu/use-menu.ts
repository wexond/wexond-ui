import React from 'react';

import { PopupXPosition } from '~/popup/popup-utils';

export interface MenuListData {
  id: number;
  ref?: React.MutableRefObject<HTMLUListElement | null>;
  xPosition?: React.MutableRefObject<PopupXPosition | null>;
  activeItem?: MenuItemData | null; // MenuItemData;
  setActiveItem?: React.Dispatch<React.SetStateAction<MenuItemData | null>>;
  deleted?: boolean;
  unselect: () => void;
  reselect: () => void;
}

export interface MenuItemData {
  id: number;
  ref?: React.MutableRefObject<HTMLLIElement | null>;
  toggleSubmenu?: React.Dispatch<React.SetStateAction<boolean>>;
  hasSubmenu?: boolean;
  deleted?: boolean;
}

export const useMenu = () => {
  const visibleLists = React.useRef<MenuListData[]>([]);
  const itemMouseTimer = React.useRef<NodeJS.Timeout | null>(null);

  const clearItemMouseTimer = React.useCallback(() => {
    if (itemMouseTimer.current != null) {
      clearTimeout(itemMouseTimer.current);
    }
  }, []);

  const addVisibleList = React.useCallback((list: MenuListData) => {
    const { id } = list;

    const index = visibleLists.current.findIndex((r) => r.id === id);

    if (index !== -1) {
      visibleLists.current[index] = { ...list, deleted: false };

      return index;
    } else {
      return visibleLists.current.push(list) - 1;
    }
  }, []);

  const removeVisibleList = React.useCallback((id: number) => {
    visibleLists.current = visibleLists.current.filter((r) => r.id !== id);

    // if (unmount) {
    //   visibleLists.current = visibleLists.current.filter((r) => r.id !== id);
    // } else {
    //   const index = visibleLists.current.findIndex((r) => r.id === id);

    //   visibleLists.current[index] = { id, deleted: true };
    // }
  }, []);

  const getRootList = React.useCallback(() => {
    return visibleLists.current[0];
  }, []);

  return {
    visibleLists,
    addVisibleList,
    removeVisibleList,
    itemMouseTimer,
    clearItemMouseTimer,
    getRootList,
  };
};
