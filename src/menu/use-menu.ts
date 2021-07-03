import React from 'react';

import { MenuProps } from '../components/Menu';
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
  ref: React.MutableRefObject<HTMLElement | null>;
  hasSubmenu: boolean;
  onSelect?: (middleButton?: boolean) => void;
}

export const useMenu = (props: MenuProps) => {
  const { onOpen, onClose } = props;

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
        if (buttonRef.current) {
          controllers.current?.[0].ref?.current?.focus();
        }

        onOpen?.();
      } else {
        clearMenuRequest();
        buttonRef.current?.focus();

        onClose?.();
      }

      _toggle(visible);
    },
    [onOpen, onClose, clearMenuRequest],
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
