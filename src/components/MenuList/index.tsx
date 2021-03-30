import React from 'react';

import { MenuContext, MenuListContext } from '../../menu/menu-context';
import { useMenuList } from '../../menu/use-menu-list';
import { getPopupPosition, PopupOptions } from '../../popup/popup';
import { setPosition } from '../../utils/dom';
import { mergeEvents, mergeRefs } from '../../utils/react';
import {
  StyledMenuList,
  BlurEffect,
  Container,
  MENU_LIST_PADDING_Y,
} from './style';

export interface MenuListProps extends React.HTMLAttributes<HTMLDivElement> {
  x?: number;
  y?: number;
  parentWidth?: number;
  parentHeight?: number;
}

export const SUBMENU_MARGIN = -4;
export const MENU_ITEM_MARGIN = 4;

export const MenuList = React.forwardRef<HTMLDivElement, MenuListProps>(
  (
    {
      x,
      y,
      parentWidth,
      parentHeight,
      onKeyDown,
      onMouseEnter,
      onBlur,
      onWheel,
      children,
      ...props
    },
    ref,
  ) => {
    const menu = React.useContext(MenuContext);

    const parentList = React.useContext(MenuListContext);
    const list = useMenuList(parentList?.id);

    const setUp = React.useRef(false);
    const blurRef = React.useRef<HTMLDivElement | null>(null);

    React.useLayoutEffect(() => {
      const ref = list.ref.current;
      const containerRef = list.containerRef.current;

      if (!menu || !menu.isOpen || !ref || !containerRef || !blurRef.current)
        return;

      const lists = menu.visibleLists.current;

      if (!setUp.current && lists != null) {
        const root = lists.find((r) => r?.parentId == null);
        const parent = list.getParentList();

        const parentRect = ref.parentElement?.getBoundingClientRect();

        const btn = menu.buttonRef.current;

        let opts = {
          width: ref.clientWidth + 2,
          height: ref.clientHeight,
          maxWidth: menu.maxWidth,
          maxHeight: menu.maxHeight,
          insetY: 24,
          relative: false,
        } as PopupOptions;

        if ((parent == null && btn) || (x != null && y != null)) {
          opts = {
            ...opts,

            parentLeft: btn?.offsetLeft ?? (x as number),
            parentTop: btn?.offsetTop ?? (y as number),
            parentWidth: btn?.clientWidth ?? (parentWidth as number),
            parentHeight: btn?.clientHeight ?? (parentHeight as number),

            placement: menu.placement,

            marginX: menu.marginX,
            marginY: menu.marginY,
          };
        } else if (parentRect) {
          opts = {
            ...opts,

            parentLeft: parentRect.x,
            parentTop: parentRect.y,
            parentWidth: parentRect.width,
            parentHeight: parentRect.height,

            marginX: SUBMENU_MARGIN,
            marginY: -MENU_ITEM_MARGIN,

            placement:
              parent !== root && parent?.popup?.current
                ? parent.popup.current.placement
                : 'right-start',
          };
        }

        list.popup.current = getPopupPosition(opts);
        setUp.current = true;
      }

      const popup = list.popup.current;

      if (popup) {
        ref.style.maxWidth = popup.maxWidth + 'px';
        ref.style.maxHeight = popup.maxHeight - MENU_LIST_PADDING_Y + 'px';
        containerRef.style.maxHeight = popup.maxHeight + 'px';

        blurRef.current.style.height =
          containerRef.clientHeight + MENU_LIST_PADDING_Y * 2 + 'px';

        setPosition(list.ref.current, popup.x, popup.y);
      }
    }, [menu, list, x, y, parentWidth, parentHeight]);

    return (
      <StyledMenuList
        ref={mergeRefs(list.ref, ref)}
        tabIndex={-1}
        onKeyDown={mergeEvents(onKeyDown, list.props.onKeyDown)}
        onWheel={mergeEvents(onWheel, list.props.onWheel)}
        onBlur={mergeEvents(onBlur, list.props.onBlur)}
        isOpen={menu?.isOpen}
        {...props}
      >
        <BlurEffect ref={blurRef} />
        {menu?.isOpen && (
          <Container ref={list.containerRef}>
            <MenuListContext.Provider value={list}>
              {children}
            </MenuListContext.Provider>
          </Container>
        )}
      </StyledMenuList>
    );
  },
);

MenuList.defaultProps = {
  parentWidth: 0,
  parentHeight: 0,
};
