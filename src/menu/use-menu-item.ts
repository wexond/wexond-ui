import React from 'react';

import { MenuContext, MenuListContext } from './menu-context';
import { useMenuItemController } from './use-menu-item-controller';

export const useMenuItem = (
  hasSubmenu: boolean,
  onSelect?: (middleButton?: boolean) => void,
  isDisabled?: boolean,
) => {
  const root = React.useContext(MenuContext);
  const listController = React.useContext(MenuListContext);

  const {
    ref,
    controller,
    props: { onFocus, onMouseEnter },
  } = useMenuItemController({
    hasSubmenu,
    onSelect,
    isDisabled,
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
        listController?.focusItem(controller.id);

        return;
      }

      onSelect?.(e.button === 1);
      root.toggle(false);
    },
    [onSelect, root, listController, hasSubmenu, controller.id],
  );

  return {
    ref,
    props: { onMouseEnter, onFocus, onMouseLeave, onMouseUp },
    isSubmenuOpen,
  };
};
