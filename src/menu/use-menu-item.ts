import React from 'react';

import { useDelayedHover } from '~/hooks/use-delayed-hover';
import { MenuContext, MenuListContext } from './menu-context';
import { MenuItemData } from './use-menu';

export const useMenuItem = (hasSubmenu: boolean) => {
  const menu = React.useContext(MenuContext);
  const list = React.useContext(MenuListContext);

  const itemRef = React.useRef<HTMLLIElement | null>(null);
  const [isSubmenuVisible, toggleSubmenu] = React.useState(false);

  const itemData: MenuItemData = React.useMemo(
    () => ({ ref: itemRef, toggleSubmenu, hasSubmenu }),
    [hasSubmenu],
  );

  React.useEffect(() => {
    if (isSubmenuVisible && hasSubmenu) {
      const data = list?.getData();
      if (data) data.activeItem = itemData;
    }

    return () => {
      if (isSubmenuVisible && hasSubmenu) {
        const data = list?.getData();
        if (data) data.activeItem = undefined;
      }
    };
  }, [isSubmenuVisible, list?.getData, list, itemData, hasSubmenu]);

  React.useEffect(() => {
    list?.menus.current.push(itemData);

    return () => {
      if (list?.menus) {
        list.menus.current = list.menus.current.filter((r) => r !== itemData);
      }
    };
  }, [itemData, list?.menus]);

  const onClick = React.useCallback(() => {
    if (hasSubmenu) toggleSubmenu(true);
  }, [hasSubmenu]);

  const onHover = React.useCallback(() => {
    const lists = menu?.visibleLists.current;
    const data = list?.getData();

    if (!lists || !data) return;

    const nextList = lists[lists?.indexOf(data) + 1];

    if (!data?.activeItem && hasSubmenu) {
      toggleSubmenu(true);
      return;
    }

    if (data?.activeItem?.hasSubmenu && data.activeItem !== itemData) {
      data.activeItem?.toggleSubmenu?.(false);
    } else if (nextList?.activeItem?.hasSubmenu) {
      nextList.activeItem?.toggleSubmenu?.(false);
    }
  }, [menu, list, hasSubmenu, itemData]);

  const _onMouseEnter = React.useCallback(() => {
    onHover();
  }, [onHover]);

  const _onMouseLeave = React.useCallback(() => {}, []);

  // const onLeave = React.useCallback(
  //   (e: React.MouseEvent) => {
  //     const relatedTarget = e.relatedTarget as HTMLElement | Window;

  //     const outside =
  //       e.relatedTarget === window ||
  //       !menu?.visibleLists.current[0].ref?.current?.contains(
  //         relatedTarget as HTMLElement,
  //       );

  //     // if (!outside) console.log('xdd');
  //   },
  //   [menu?.visibleLists],
  // );

  // const { onMouseEnter, onMouseLeave } = useDelayedHover(onHover, 500); //300
  // const {
  //   onMouseEnter: onMouseEnterD,
  //   onMouseLeave: onMouseLeaveD,
  // } = useDelayedHover(onLeave, 500);

  // const _onMouseEnter = React.useCallback(
  //   (e: React.MouseEvent<HTMLElement>) => {
  //     onMouseEnter(e);
  //     // onMouseEnterD(e);

  //     list?.setSelectedIndex(list.menus.current.indexOf(itemData));
  //   },
  //   [onMouseEnter, onMouseEnterD, itemData, list],
  // );

  // const timer = React.useRef<number | null>(null);

  // const _onMouseLeave = React.useCallback(
  //   (e: React.MouseEvent) => {
  //     const relatedTarget = e.relatedTarget as HTMLElement | Window;

  //     console.log(e.relatedTarget);

  //     // onMouseLeave(e);
  //     // onMouseLeaveD(e);

  //     const outside =
  //       e.relatedTarget === window ||
  //       !menu?.visibleLists.current[0].ref?.current?.contains(
  //         relatedTarget as HTMLElement,
  //       );

  //     if (outside) {
  //       timer.current = setTimeout(() => {
  //         const activeItem = list?.getData()?.activeItem;

  //         if (activeItem?.hasSubmenu) {
  //           activeItem.toggleSubmenu(false);
  //         }
  //       }, 300);
  //     } else {
  //       clearTimeout(timer.current);
  //       onMouseLeave(e);
  //     }
  //     //!list?.listRef.current?.contains(relatedTarget as HTMLElement);

  //     // console.log(outside);
  //     // if (!outside) onMouseLeave();
  //   },
  //   [list?.listRef, onMouseLeave, onMouseLeaveD, menu?.visibleLists],
  // );

  const isSelected = React.useMemo(() => {
    const index = list?.menus.current.indexOf(itemData);

    return list?.selectedIndex !== -1 && list?.selectedIndex === index;
  }, [list, itemData]);

  return {
    itemRef,
    isSubmenuVisible,
    props: {
      onMouseEnter: _onMouseEnter,
      onMouseLeave: _onMouseLeave,
      onClick,
    },
    isSelected,
  };
};
