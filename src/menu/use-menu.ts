import React from 'react';

import { MenuProps } from '../components/Menu';
import { useItems } from '../hooks/use-items';
import { PopupInfo } from '../popup/popup';

export interface MenuListController {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  itemsList: React.MutableRefObject<MenuItemController[]>;
  popupInfo: React.MutableRefObject<PopupInfo | null>;
  focusNext: () => void;
  focusPrevious: () => void;
  focusItem: (index: number) => void;
  focusUsingText: (text: string) => void;
  focusedItem: React.MutableRefObject<MenuItemController | null>;
  getFocusedIndex: () => number;
  activeItem: React.MutableRefObject<MenuItemController | null>;
  requestSubmenu: (index: number, delay?: boolean) => void;
  hideSubmenu: () => void;
  getParent: () => MenuListController | null;
  submenu: MenuItemController | null;
}

export interface MenuItemController {
  ref: React.MutableRefObject<HTMLLIElement | null>;
  hasSubmenu: boolean;
}

export const useMenu = (props: MenuProps) => {
  const [isOpen, _toggle] = React.useState(props.isVisibleByDefault);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  const controllers = React.useRef<MenuListController[]>([]);
  const menuRequest = React.useRef<NodeJS.Timeout | null>(null);

  const clearMenuRequest = React.useCallback(() => {
    if (menuRequest.current != null) {
      clearTimeout(menuRequest.current);
    }
  }, []);

  const requestMenu = React.useCallback(
    (cb: (...args: any) => any, delay = false) => {
      clearMenuRequest();
      menuRequest.current = setTimeout(cb, delay ? 300 : 0);
    },
    [clearMenuRequest],
  );

  const toggle = React.useCallback(
    (visible: boolean) => {
      if (visible) {
        // onOpen?.();
      } else {
        clearMenuRequest();
        // onClose?.();
      }

      if (buttonRef.current) {
        _toggle(visible);
      }
    },
    [/*onOpen, onClose, clearItemMouseTimer*/ clearMenuRequest],
  );

  return {
    controllers,
    props,
    menuRequest,
    requestMenu,
    clearMenuRequest,
    isOpen,
    toggle,
    buttonRef,
  };
};
