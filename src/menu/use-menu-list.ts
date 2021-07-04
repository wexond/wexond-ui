import React from 'react';

import { PopupInfo } from '../popup/popup';
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
    (id: number, delay = false) => {
      if (!root) return;

      root.requestMenu(() => {
        const item = itemsList.current.find((r) => r.id === id);

        if (!item) return;

        root.menuRequest.current = null;

        if (item?.hasSubmenu) {
          activeItem.current = item;
          setSubmenu(item);

          return;
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

  const getEnabledItems = React.useCallback(() => {
    return itemsList.current.filter((r) => !r.isDisabled);
  }, []);

  const getFocusedIndex = React.useCallback(() => {
    const focused = focusedItem.current;
    const items = getEnabledItems();

    return !focused ? -1 : items.findIndex((r) => r.id === focused.id);
  }, [getEnabledItems]);

  const focusItem = React.useCallback((id: number) => {
    const item = itemsList.current?.find((r) => r.id === id);

    item?.ref?.current?.focus();
  }, []);

  const focusNext = React.useCallback(() => {
    let index = getFocusedIndex();
    const items = getEnabledItems();

    if (++index >= items.length) {
      index = 0;
    }

    focusItem(items[index]?.id);
  }, [getFocusedIndex, focusItem, getEnabledItems]);

  const focusPrevious = React.useCallback(() => {
    let index = getFocusedIndex();
    const items = getEnabledItems();

    if (--index < 0) {
      index = getEnabledItems().length - 1;
    }

    focusItem(items[index]?.id);
  }, [getFocusedIndex, focusItem, getEnabledItems]);

  const focusUsingText = React.useCallback(
    (text: string) => {
      const index = getFocusedIndex();
      const items = getEnabledItems();

      const rest = items.slice(index + 1).concat(items.slice(0, index));

      const match = rest.find((r) =>
        r?.ref?.current?.textContent?.toLowerCase()?.startsWith(text),
      );

      if (match) {
        focusItem(match.id);
      }
    },
    [focusItem, getFocusedIndex, getEnabledItems],
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

  const onBlur = React.useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      const target = e.relatedTarget as Node;

      if (
        root &&
        root.isOpen &&
        ref.current &&
        !parentController &&
        !ref.current.contains(target)
      ) {
        // activeItem.current = null;
        // focusedItem.current = null;
        // itemsList.current = [];
        // root.toggle(false);
      }
    },
    [parentController, root],
  );

  return { containerRef, parentController, controller, props: { onBlur } };
};
