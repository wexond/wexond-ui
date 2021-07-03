import React from 'react';

import { MenuListContext } from './menu-context';
import { MenuItemController } from './use-menu';

export const useMenuItemController = (base?: Partial<MenuItemController>) => {
  const listController = React.useContext(MenuListContext);

  const ref = React.useRef<HTMLElement | null>(null);
  const globalIndex = React.useRef<number>(-1);

  const controller = React.useMemo<MenuItemController>(
    () => ({
      ...(base as any),
      ref,
    }),
    [base],
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

  return {
    controller,
    ref,
    globalIndex,
    props: { onFocus },
  };
};
