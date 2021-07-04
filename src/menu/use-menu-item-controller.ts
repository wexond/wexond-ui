import React from 'react';
import { useId } from '../hooks/use-id';

import { MenuListContext } from './menu-context';
import { MenuItemController } from './use-menu';

export const useMenuItemController = (base?: Partial<MenuItemController>) => {
  const listController = React.useContext(MenuListContext);

  const id = useId();

  const ref = React.useRef<HTMLElement | null>(null);
  const globalIndex = React.useRef<number>(-1);

  const focusParent = React.useCallback(() => {
    listController?.ref?.current?.focus();
  }, [listController?.ref]);

  const controller = React.useMemo<MenuItemController>(
    () => ({
      ...(base as any),
      id,
      ref,
      focusParent,
    }),
    [id, base, focusParent],
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

  const onFocus = React.useCallback(() => {
    if (!listController) return;
    listController.focusedItem.current = controller;
  }, [listController, controller]);

  const onMouseEnter = React.useCallback(() => {
    if (controller.isDisabled) return;

    ref.current?.focus();
    listController?.requestSubmenu(id, true);
  }, [id, listController, controller]);

  return {
    controller,
    ref,
    globalIndex,
    props: { onFocus, onMouseEnter },
  };
};
