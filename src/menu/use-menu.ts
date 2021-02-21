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
  onSelect?: () => void;
}

export const useMenu = ({
  onOpen,
  onClose,
  placement,
  marginX,
  marginY,
  isVisibleByDefault,
}: MenuProps) => {
  const [isOpen, _toggle] = React.useState(isVisibleByDefault);

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

  const toggle = React.useCallback(
    (visible: boolean) => {
      if (visible) {
        onOpen?.();
      } else {
        onClose?.();
        buttonRef.current?.focus();
      }
      _toggle(visible);
    },
    [onOpen, onClose],
  );

  return {
    visibleLists,
    addVisibleList,
    removeVisibleList,
    itemMouseTimer,
    clearItemMouseTimer,
    setItemMouseTimer,
    onOpen,
    onClose,
    isOpen,
    toggle,
    buttonRef,
    placement,
    marginX,
    marginY,
  };
};
