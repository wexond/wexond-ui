import React from 'react';

import { MenuProps } from '../components/Menu';
import { useItems } from '../hooks/use-items';
import { PopupInfo } from '../popup/popup';

export interface MenuListData {
  id: number;
  ref?: React.MutableRefObject<HTMLUListElement | null>;
  popup?: React.MutableRefObject<PopupInfo | null>;
  activeItem?: MenuItemData | null;
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

export const useMenu = ({
  onOpen,
  beforeClose,
  placement,
  marginX,
  marginY,
}: MenuProps) => {
  const [isOpen, toggle] = React.useState(false);

  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

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

  const emitBeforeClose = React.useCallback(
    (index: number | null | undefined) => {
      if (index === -1 || index == null) return;

      const refs = visibleLists.current
        .slice(index + 1)
        .map((r) => r?.ref?.current) as HTMLUListElement[];

      beforeClose?.(...refs);
    },
    [visibleLists, beforeClose],
  );

  return {
    visibleLists,
    addVisibleList,
    removeVisibleList,
    itemMouseTimer,
    clearItemMouseTimer,
    onOpen,
    emitBeforeClose,
    isOpen,
    toggle,
    buttonRef,
    placement,
    marginX,
    marginY,
  };
};
