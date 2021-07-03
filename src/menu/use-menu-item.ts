import React from 'react';

import { MenuContext, MenuListContext } from './menu-context';
import { MenuItemController } from './use-menu';
import { useMenuItemController } from './use-menu-item-controller';

export const useMenuItem = (
  hasSubmenu: boolean,
  onSelect?: (middleButton?: boolean) => void,
) => {
  const root = React.useContext(MenuContext);
  const listController = React.useContext(MenuListContext);

  const {
    ref,
    controller,
    globalIndex,
    props: { onFocus, onMouseEnter },
  } = useMenuItemController({
    hasSubmenu,
    onSelect,
  });

  const isSubmenuOpen =
    hasSubmenu && listController?.submenu?.id === controller.id;

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
          if (listController.activeItem.current?.id === controller.id) return;

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
    [onSelect, root, listController, hasSubmenu, globalIndex],
  );

  return {
    ref,
    props: { onMouseEnter, onFocus, onMouseLeave, onMouseUp },
    isSubmenuOpen,
  };
};
