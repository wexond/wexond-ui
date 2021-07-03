import React from 'react';

import { useId } from '../hooks/use-id';
import { useItems } from '../hooks/use-items';
import { PopupInfo, PopupOptions } from '../popup/popup';
import { MenuContext, MenuListContext } from './menu-context';
import { MenuItemController, MenuListController } from './use-menu';

export const useMenuList = () => {
  const root = React.useContext(MenuContext);
  const parentController = React.useContext(MenuListContext);

  const ref = React.useRef<HTMLDivElement | null>(null);

  const containerRef = React.useRef<HTMLUListElement | null>(null);
  const globalIndex = React.useRef<number>(-1);

  const popupInfo = React.useRef<PopupInfo | null>(null);

  const [submenu, setSubmenu] = React.useState<MenuItemController | null>(null);

  const itemsList = React.useRef<MenuItemController[]>([]);
  const focusedItem = React.useRef<MenuItemController | null>(null);
  const activeItem = React.useRef<MenuItemController | null>(null);

  const requestSubmenu = React.useCallback(
    (index: number, delay = false) => {
      if (!root) return;

      root.requestMenu(() => {
        if (index != null) {
          const item = itemsList.current[index];

          root.menuRequest.current = null;

          if (item?.hasSubmenu) {
            const item = itemsList.current[index];

            activeItem.current = item;
            return setSubmenu(item);
          }
        }

        setSubmenu(null);
        activeItem.current = null;
      }, delay);
    },
    [root],
  );

  const hideSubmenu = React.useCallback(() => {
    root?.clearMenuRequest();

    setSubmenu(null);
    activeItem.current = null;

    focusedItem.current?.ref?.current?.focus();
  }, [root]);

  const getFocusedIndex = React.useCallback(() => {
    const focused = focusedItem.current;
    const items = itemsList.current;

    return !focused ? -1 : items.indexOf(focused);
  }, [itemsList]);

  const focusItem = React.useCallback((index: number) => {
    itemsList.current[index]?.ref?.current?.focus();
  }, []);

  const focusNext = React.useCallback(() => {
    let index = getFocusedIndex();

    if (++index >= itemsList.current.length) {
      index = 0;
    }

    focusItem(index);
  }, [getFocusedIndex, focusItem]);

  const focusPrevious = React.useCallback(() => {
    let index = getFocusedIndex();

    if (--index < 0) {
      index = itemsList.current.length - 1;
    }

    focusItem(index);
  }, [getFocusedIndex, focusItem]);

  const focusUsingText = React.useCallback(
    (text: string) => {
      const index = getFocusedIndex();

      const rest = itemsList.current
        .slice(index + 1)
        .concat(itemsList.current.slice(0, index));

      const match = rest.find((r) =>
        r?.ref?.current?.textContent?.toLowerCase()?.startsWith(text),
      );

      if (match) {
        focusItem(itemsList.current.indexOf(match));
      }
    },
    [focusItem, getFocusedIndex],
  );

  const getParent = React.useCallback(() => {
    if (!root) return null;

    return root.controllers.current[globalIndex.current - 1];
  }, [root]);

  const controller = React.useMemo<MenuListController>(
    () => ({
      ref,
      itemsList,
      focusedItem,
      focusNext,
      focusPrevious,
      getFocusedIndex,
      focusUsingText,
      focusItem,
      activeItem,
      popupInfo,
      requestSubmenu,
      getParent,
      hideSubmenu,
      submenu,
    }),
    [
      focusNext,
      focusPrevious,
      focusItem,
      getFocusedIndex,
      focusUsingText,
      requestSubmenu,
      activeItem,
      getParent,
      hideSubmenu,
      submenu,
    ],
  );

  React.useEffect(() => {
    const controllers = root?.controllers;

    if (!controllers) {
      throw new Error('Menu list must be a child of Menu');
    }

    if (globalIndex.current === -1) {
      globalIndex.current = controllers.current.push(controller) - 1;
    } else {
      controllers.current[globalIndex.current] = controller;
    }
  }, [root?.controllers, controller]);

  return { containerRef, parentController, controller };
};
