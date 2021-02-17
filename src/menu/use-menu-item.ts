import React from 'react';

import { useId } from '../hooks/use-id';
import { MenuContext, MenuListContext } from './menu-context';
import { MenuItemData, MenuListData } from './use-menu';

export const useMenuItem = (hasSubmenu: boolean) => {
  const id = useId();

  const menu = React.useContext(MenuContext);
  const list = React.useContext(MenuListContext);

  const itemRef = React.useRef<HTMLLIElement | null>(null);
  const [isSubmenuOpened, toggleSubmenu] = React.useState(false);

  const itemData: MenuItemData = React.useMemo(
    () => ({ id, ref: itemRef, toggleSubmenu, hasSubmenu }),
    [id, hasSubmenu],
  );

  React.useEffect(() => {
    list?.addItem(itemData);
  }, [list, itemData]);

  React.useEffect(() => {
    return () => list?.removeItem(id);
  }, [list, id]);

  const onClick = React.useCallback(() => {
    if (hasSubmenu) {
      toggleSubmenu(true);
      list?.setActiveItem(itemData);
    }
  }, [hasSubmenu, itemData, list]);

  const onHover = React.useCallback(() => {
    if (hasSubmenu && itemData !== list?.activeItem) {
      toggleSubmenu(true);
      list?.setActiveItem(itemData);
      return;
    }

    const lists = menu?.visibleLists.current;
    const childList = list?.getChildList();

    if (list?.activeItem?.hasSubmenu && list.activeItem !== itemData) {
      menu?.emitBeforeClose(list.globalIndex.current);

      list.activeItem?.toggleSubmenu?.(false);
      list.setActiveItem(null);
    } else if (childList?.activeItem?.hasSubmenu) {
      menu?.emitBeforeClose(lists?.indexOf(childList));

      childList.activeItem.toggleSubmenu?.(false);
      childList.setActiveItem?.(null);
    }
  }, [itemData, list, hasSubmenu, menu]);

  const onMouseEnter = React.useCallback(() => {
    if (menu && list) {
      list.ref.current?.focus();

      const itemIndex = list.items.current.indexOf(itemData);

      list.setSelectedIndex(itemIndex);

      if (list.activeItem !== itemData) {
        const childList = list.getChildList();

        childList?.unselect();
      }

      list.getParentList()?.reselect();

      menu.clearItemMouseTimer();
      menu.itemMouseTimer.current = setTimeout(onHover, 300);
    }

    return menu?.clearItemMouseTimer;
  }, [list, itemData, onHover, menu]);

  const isSelected = React.useMemo(() => {
    const index = list?.items.current.indexOf(itemData);

    return list?.selectedIndex !== -1 && list?.selectedIndex === index;
  }, [list, itemData]);

  return {
    itemRef,
    isSubmenuOpened,
    props: {
      onMouseEnter,
      onClick,
    },
    isSelected,
  };
};
