import React from 'react';

import { useId } from '../hooks/use-id';
import { useItems } from '../hooks/use-items';
import { PopupInfo } from '../popup/popup';
import { MenuContext } from './menu-context';
import { MenuItemData, MenuListData } from './use-menu';

export const useMenuList = (parentId?: number) => {
  const menu = React.useContext(MenuContext);

  const id = useId();
  const ref = React.useRef<HTMLUListElement | null>(null);
  const popup = React.useRef<PopupInfo | null>(null);

  const [hoveredItem, setHoveredItem] = React.useState<MenuItemData | null>();
  const [selectedItem, setSelectedItem] = React.useState<MenuItemData | null>();

  const { items, addItem, removeItem } = useItems<MenuItemData>();

  const getParentList = React.useCallback(() => {
    if (!menu?.visibleLists) return;
    return menu.visibleLists.current.find((r) => r?.id === parentId);
  }, [menu?.visibleLists, parentId]);

  const unselect = React.useCallback(() => {
    if (hoveredItem != null) {
      setHoveredItem(null);

      const childList = menu?.visibleLists.current.find(
        (r) => r?.parentId === id,
      );

      childList?.unselect?.();
    }
  }, [id, hoveredItem, menu?.visibleLists]);

  const data = React.useMemo<MenuListData>(
    () => ({
      id,
      parentId,
      ref,
      popup,
      unselect,
      setSelectedItem,
    }),
    [id, parentId, unselect],
  );

  React.useEffect(() => {
    if (menu) {
      menu.addVisibleList(data);
    }

    return () => menu?.removeVisibleList(id);
  }, [id, menu, data]);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
      // menu?.onOpen?.(ref.current);
    }
  }, [menu]);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLUListElement>) => {
      const list = ref.current;
      if (!list || !menu?.visibleLists.current || !menu) return;

      e.stopPropagation();

      const itemsLength = items.current.length;

      const hoveredIndex =
        hoveredItem == null ? -1 : items.current.indexOf(hoveredItem);
      let _hoveredIndex = hoveredIndex;

      // console.log(_hoveredIndex);

      if (e.key === 'ArrowDown' && ++_hoveredIndex >= itemsLength) {
        _hoveredIndex = 0;
      } else if (e.key === 'ArrowUp' && --_hoveredIndex < 0) {
        _hoveredIndex = itemsLength - 1;
      } else if (!selectedItem?.hasSubmenu && e.key === 'Enter') {
        // selectedItem?.onSelect?.();
        // hideAll();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (_hoveredIndex === -1) {
          _hoveredIndex = 0;
        } else {
          setSelectedItem(items.current[_hoveredIndex]);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'Escape') {
        const lists = menu.visibleLists.current;
        const list = lists[lists.length - 2];

        if (list) {
          menu.emitBeforeClose(lists.indexOf(list));

          list.setSelectedItem?.(null);
          list.ref?.current?.focus();

          _hoveredIndex = -1;
        } else if (e.key !== 'ArrowLeft') {
          menu.toggle(false);
          menu.onClose?.();
          menu.buttonRef?.current?.focus();
        }
      } else {
        const rest = items.current
          .slice(_hoveredIndex + 1)
          .concat(items.current.slice(0, _hoveredIndex));

        const match = rest.find((r) =>
          r?.ref?.current?.textContent?.toLowerCase()?.startsWith(e.key),
        );
        if (match) {
          _hoveredIndex = items.current.indexOf(match);
        }
      }

      if (hoveredIndex !== _hoveredIndex) {
        setHoveredItem(items.current[_hoveredIndex]);
      }
    },
    [hoveredItem, items, menu, selectedItem?.hasSubmenu],
  );

  return {
    id,
    ref,
    items,
    addItem,
    removeItem,
    hoveredItem,
    setHoveredItem,
    selectedItem,
    setSelectedItem,
    popup,
    props: { onKeyDown },
    getParentList,
  };
};
