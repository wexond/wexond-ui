import React from 'react';

import { useId } from '../hooks/use-id';
import { MenuContext, MenuListContext } from './menu-context';
import { MenuItemData } from './use-menu';

export const useMenuItem = (hasSubmenu: boolean, _onSelect?: () => void) => {
  const id = useId();

  const menu = React.useContext(MenuContext);
  const list = React.useContext(MenuListContext);

  const ref = React.useRef<HTMLLIElement | null>(null);

  const data = React.useMemo<MenuItemData>(
    () => ({
      id,
      listId: list?.id,
      ref,
      hasSubmenu,
    }),
    [id, list?.id, hasSubmenu],
  );

  React.useEffect(() => {
    list?.addItem(data);
    return () => list?.removeItem(id);
  }, [id, list, data]);

  const isHovered = React.useMemo(() => {
    if (!list) return false;
    return list.hoveredItem?.id === data.id;
  }, [list, data]);

  const getChildList = React.useCallback(() => {
    return menu?.visibleLists.current.find((r) => r?.parentId === list?.id);
  }, [list?.id, menu?.visibleLists]);

  const onSelect = React.useCallback(() => {
    if (list?.selectedItem?.id == data.id) {
      getChildList()?.setSelectedItem?.(null);
      return;
    }

    list?.setSelectedItem(data);
  }, [list, data, getChildList]);

  const isSubmenuOpen = hasSubmenu && list && list.selectedItem === data;

  const onMouseEnter = React.useCallback(
    (e: React.MouseEvent) => {
      if (!list || !menu) return;

      list.ref.current?.focus();

      list.setHoveredItem(data);
      menu.setItemMouseTimer(onSelect);

      if (list.selectedItem?.hasSubmenu && data.id !== list.selectedItem?.id) {
        getChildList()?.unselect?.();
      }

      return menu.clearItemMouseTimer;
    },
    [menu, list, data, onSelect, getChildList],
  );

  const onMouseLeave = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!list || !menu) return;

      e.stopPropagation();

      const parentList = list.getParentList();

      if (
        e.relatedTarget !== window &&
        e.relatedTarget !== list.ref.current &&
        parentList?.ref?.current?.contains(e.relatedTarget as Node)
      ) {
        menu.setItemMouseTimer(() => list.setSelectedItem(null));
      }

      if (
        list.selectedItem?.hasSubmenu &&
        list.hoveredItem === list.selectedItem
      ) {
        return;
      }

      if (
        e.relatedTarget === window ||
        !list.items.current.find((r) => r?.ref?.current === e.relatedTarget)
      ) {
        list.setHoveredItem(null);
      }
    },
    [menu, list],
  );

  return {
    ref,
    isHovered,
    isSubmenuOpen,
    props: { onMouseEnter, onMouseLeave },
  };
};
