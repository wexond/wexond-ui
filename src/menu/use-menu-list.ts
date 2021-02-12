import React from 'react';

import { useId } from '~/hooks/use-id';
import { PopupXPosition } from '~/popup/popup-utils';
import { MenuContext } from './menu-context';
import { MenuItemData } from './use-menu';

export const useMenuList = () => {
  const menu = React.useContext(MenuContext);

  const id = useId();
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const xPosRef = React.useRef<PopupXPosition | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
  const hasSubmenu = React.useRef(false);

  const menus = React.useRef<MenuItemData[]>([]);

  const getData = React.useCallback(() => {
    return menu?.visibleLists.current.find((r) => r.id === id);
  }, [id, menu?.visibleLists]);

  const onChildListMouseEnter = React.useCallback(() => {
    const data = getData();

    if (data?.activeItem) {
      const index = menus.current.indexOf(data.activeItem);

      setSelectedIndex(index);
    }
  }, [getData]);

  React.useEffect(() => {
    menu?.visibleLists.current.push({
      id,
      ref: listRef,
      xPosRef,
      onChildListMouseEnter,
    });

    return () => {
      if (menu?.visibleLists) {
        menu.visibleLists.current = menu.visibleLists.current.filter(
          (r) => r.id !== id,
        );
      }
    };
  }, [id, menu?.visibleLists, onChildListMouseEnter]);

  const getChildren = React.useCallback(() => {
    return Array.from(listRef.current?.children || []);
  }, []);

  React.useEffect(() => {
    listRef.current?.focus();
  }, []);

  const getIndex = React.useCallback(() => {
    return menu?.visibleLists.current.findIndex((r) => r.id === id);
  }, [id, menu?.visibleLists]);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLUListElement>) => {
      const list = listRef.current;
      if (!list || !menu?.visibleLists.current) return;

      e.stopPropagation();

      const children = getChildren();

      let focusedIndex = selectedIndex;

      if (e.key === 'ArrowDown' && ++focusedIndex >= children.length) {
        focusedIndex = 0;
      } else if (e.key === 'ArrowUp' && --focusedIndex < 0) {
        focusedIndex = children.length - 1;
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        menus.current[focusedIndex]?.toggleSubmenu?.(true);
      } else if (e.key === 'ArrowLeft' || e.key === 'Escape') {
        const lists = menu?.visibleLists.current;
        const list = lists[lists.length - 2];

        list?.activeItem?.toggleSubmenu?.(false);
        list?.ref?.current?.focus();

        return;
      } else {
        const items = children
          .slice(focusedIndex + 1)
          .concat(children.slice(0, focusedIndex));

        const match = items.find((r) =>
          r.textContent?.toLowerCase()?.startsWith(e.key),
        );

        if (match) {
          focusedIndex = children.indexOf(match);
        }
      }

      setSelectedIndex(focusedIndex);
    },
    [getChildren, selectedIndex, menu?.visibleLists],
  );

  const onMouseEnter = React.useCallback(
    (e: React.MouseEvent) => {
      const lists = menu?.visibleLists.current;

      const index = getIndex();

      // console.log(lists?.slice(0, index));
    },
    [getIndex, menu?.visibleLists],
  );

  return {
    listRef,
    getChildren,
    selectedIndex,
    setSelectedIndex,
    hasSubmenu,
    props: { onKeyDown, onMouseEnter },
    menus,
    getData,
    getIndex,
    xPosRef,
  };
};
