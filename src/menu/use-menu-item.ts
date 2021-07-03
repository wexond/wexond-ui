import React from 'react';

import { MenuContext, MenuListContext } from './menu-context';
import { MenuItemController } from './use-menu';

export const useMenuItem = (
  hasSubmenu: boolean,
  onSelect?: (middleButton?: boolean) => void,
) => {
  const root = React.useContext(MenuContext);
  const listController = React.useContext(MenuListContext);
  const ref = React.useRef<HTMLLIElement | null>(null);

  const globalIndex = React.useRef<number>(-1);

  const controller = React.useMemo<MenuItemController>(
    () => ({
      ref,
      hasSubmenu,
      onSelect,
    }),
    [hasSubmenu, onSelect],
  );

  React.useEffect(() => {
    const itemsList = listController?.itemsList;

    if (!itemsList) {
      throw new Error('Menu item must be a child of Menu List');
    }

    if (globalIndex.current === -1) {
      globalIndex.current = itemsList.current.push(controller) - 1;
    } else {
      itemsList.current[globalIndex.current] = controller;
    }
  }, [controller, listController]);

  const isSubmenuOpen = hasSubmenu && listController?.submenu === controller;

  const onMouseEnter = React.useCallback(() => {
    ref.current?.focus();
    listController?.requestSubmenu(globalIndex.current, true);
  }, [listController]);

  const onFocus = React.useCallback(() => {
    if (!listController) return;
    listController.focusedItem.current = controller;
  }, [listController, controller]);

  const onMouseLeave = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!root || !listController) return;

      e.stopPropagation();

      if (
        e.relatedTarget !== window &&
        e.relatedTarget !== listController.ref.current &&
        listController
          ?.getParent()
          ?.ref?.current?.contains(e.relatedTarget as Node)
      ) {
        root.requestMenu(() => {
          if (listController.activeItem.current === controller) return;

          listController.hideSubmenu();
          listController.ref.current?.focus();
        }, true);
      }
    },
    [root, controller, listController],
  );

  const onMouseUp = React.useCallback(
    (e: React.MouseEvent) => {
      if (!listController || !root) return;

      e.stopPropagation();

      if (hasSubmenu) {
        listController?.focusItem(globalIndex.current);

        return;
      }

      onSelect?.(e.button === 1);
      root.toggle(false);
    },
    [onSelect, root, listController, hasSubmenu],
  );

  return {
    ref,
    props: { onMouseEnter, onFocus, onMouseLeave, onMouseUp },
    isSubmenuOpen,
  };
};
