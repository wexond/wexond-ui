import React from 'react';

import { useId } from '../hooks/use-id';
import { useItems } from '../hooks/use-items';
import { PopupInfo } from '../popup/popup';
import { MenuContext } from './menu-context';
import { MenuItemData, MenuListData } from './use-menu';

export const useMenuList = () => {
  const menu = React.useContext(MenuContext);

  const id = useId();
  const ref = React.useRef<HTMLUListElement | null>(null);
  const popup = React.useRef<PopupInfo | null>(null);

  const { items, addItem, removeItem } = useItems<MenuItemData>();

  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);

  const [activeItem, setActiveItem] = React.useState<MenuItemData | null>(null);

  const globalIndex = React.useRef<number | null>(null);

  const getParentList = React.useCallback(() => {
    const lists = menu?.visibleLists.current;

    return lists && globalIndex.current != null
      ? lists[globalIndex.current - 1]
      : null;
  }, [menu?.visibleLists]);

  const getChildList = React.useCallback(() => {
    const lists = menu?.visibleLists.current;

    return lists && globalIndex.current != null
      ? lists[globalIndex.current + 1]
      : null;
  }, [menu?.visibleLists]);

  const unselect = React.useCallback(() => {
    if (selectedIndex !== -1) {
      setSelectedIndex(-1);
      getChildList()?.unselect();
    }
  }, [selectedIndex, getChildList]);

  const listData = React.useMemo<MenuListData>(
    () => ({
      id,
      ref,
      popup,
      activeItem,
      unselect,
      setActiveItem,
    }),
    [id, activeItem, unselect],
  );

  const hideAll = React.useCallback(() => {
    if (menu) {
      setSelectedIndex(-1);
      setActiveItem(null);

      menu.emitBeforeClose(globalIndex.current);
      menu.clearItemMouseTimer();
      menu.toggle(false);
      menu.onClose?.();
      menu.buttonRef?.current?.focus();
    }
  }, [menu]);

  React.useEffect(() => {
    if (menu) {
      globalIndex.current = menu.addVisibleList(listData);
    }
  }, [menu, listData]);

  React.useEffect(() => {
    return () => menu?.removeVisibleList(id);
  }, [menu, id]);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
      menu?.onOpen?.(ref.current);
    }
  }, [menu]);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLUListElement>) => {
      const list = ref.current;
      if (!list || !menu?.visibleLists.current || !menu) return;

      e.stopPropagation();

      const itemsLength = items.current.length;
      let focusedIndex = selectedIndex;

      if (e.key === 'ArrowDown' && ++focusedIndex >= itemsLength) {
        focusedIndex = 0;
      } else if (e.key === 'ArrowUp' && --focusedIndex < 0) {
        focusedIndex = itemsLength - 1;
      } else if (!activeItem?.hasSubmenu && e.key === 'Enter') {
        activeItem?.onSelect?.();
        hideAll();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (focusedIndex === -1) {
          focusedIndex = 0;
        } else {
          items.current[focusedIndex]?.toggleSubmenu?.(true);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'Escape') {
        const lists = menu.visibleLists.current;
        const list = lists[lists.length - 2];

        if (list) {
          menu.emitBeforeClose(lists.indexOf(list));

          list.activeItem?.toggleSubmenu?.(false);
          list.ref?.current?.focus();

          focusedIndex = -1;
        } else if (e.key !== 'ArrowLeft') {
          menu.toggle(false);
          menu.onClose?.();
          menu.buttonRef?.current?.focus();
        }
      } else {
        const rest = items.current
          .slice(focusedIndex + 1)
          .concat(items.current.slice(0, focusedIndex));

        const match = rest.find((r) =>
          r?.ref?.current?.textContent?.toLowerCase()?.startsWith(e.key),
        );

        if (match) {
          focusedIndex = items.current.indexOf(match);
        }
      }

      if (focusedIndex !== selectedIndex) {
        setSelectedIndex(focusedIndex);
        setActiveItem(items.current[focusedIndex]);
      }
    },
    [menu, selectedIndex, items, activeItem, hideAll],
  );

  const onMouseEnter = React.useCallback(() => {
    getChildList()?.unselect();
  }, [getChildList]);

  const onMouseLeave = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!activeItem?.hasSubmenu) {
        setSelectedIndex(-1);
      }
    },
    [activeItem],
  );

  const onBlur = React.useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      const target = e.relatedTarget as Node;

      if (
        ref.current &&
        menu &&
        getParentList() == null &&
        !ref.current.contains(target)
      ) {
        hideAll();
      }
    },
    [getParentList, menu, hideAll],
  );

  return {
    id,
    ref,
    selectedIndex,
    setSelectedIndex,
    setActiveItem,
    props: { onKeyDown, onBlur, onMouseLeave, onMouseEnter },
    items,
    popup,
    activeItem,
    addItem,
    removeItem,
    getParentList,
    getChildList,
    globalIndex,
    hideAll,
  };
};
