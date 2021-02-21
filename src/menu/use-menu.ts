import React from 'react';

import { MenuProps } from '../components/Menu';
import { useItems } from '../hooks/use-items';
import { PopupInfo } from '../popup/popup';

export interface MenuListData {
  id: number;
  parentId?: number;
  ref?: React.MutableRefObject<HTMLUListElement | null>;
  popup?: React.MutableRefObject<PopupInfo | null>;
  setSelectedItem?: React.Dispatch<
    React.SetStateAction<MenuItemData | null | undefined>
  >;
  unselect?: () => void;
}

export interface MenuItemData {
  id: number;
  listId?: number;
  ref?: React.MutableRefObject<HTMLLIElement | null>;
  hasSubmenu?: boolean;
}

export const useMenu = ({
  onOpen,
  beforeClose,
  onClose,
  placement,
  marginX,
  marginY,
  isVisibleByDefault,
}: MenuProps) => {
  const [isOpen, toggle] = React.useState(isVisibleByDefault);

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

  const setItemMouseTimer = React.useCallback(
    (cb: (...args: any[]) => any) => {
      clearItemMouseTimer();
      itemMouseTimer.current = setTimeout(cb, 300);
    },
    [clearItemMouseTimer],
  );

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
    setItemMouseTimer,
    onOpen,
    emitBeforeClose,
    onClose,
    isOpen,
    toggle,
    buttonRef,
    placement,
    marginX,
    marginY,
  };
};
