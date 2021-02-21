import React from 'react';

import { MenuContext, MenuListContext } from '../../menu/menu-context';
import { useMenuList } from '../../menu/use-menu-list';
import { getPopupPosition, PopupOptions } from '../../popup/popup';
import { setPosition } from '../../utils/dom';
import { mergeEvents, mergeRefs } from '../../utils/react';
import { StyledMenuList } from './style';

export interface MenuListProps extends React.HTMLAttributes<HTMLUListElement> {
  x?: number;
  y?: number;
}

export const MENU_MARGIN = -4;
export const MENU_PADDING_Y = -4;

export const MenuList = React.forwardRef<HTMLUListElement, MenuListProps>(
  ({ x, y, onKeyDown, onMouseEnter, onBlur, children, ...props }, ref) => {
    const menu = React.useContext(MenuContext);

    const parentList = React.useContext(MenuListContext);
    const list = useMenuList(parentList?.id);

    const setUp = React.useRef(false);

    React.useLayoutEffect(() => {
      const lists = menu?.visibleLists.current;
      const el = list.ref.current;

      if (!setUp.current && menu && lists != null && el != null) {
        const root = lists[0];
        const parent = list.getParentList();

        const parentRect = list?.ref?.current?.parentElement?.getBoundingClientRect();
        const buttonRect = menu.buttonRef.current?.getBoundingClientRect();

        let opts = {
          width: el.offsetWidth,
          height: el.offsetHeight,
        } as PopupOptions;

        if ((parent == null && buttonRect) || (x != null && y != null)) {
          opts = {
            ...opts,

            parentLeft: buttonRect?.left ?? (x as number),
            parentTop: buttonRect?.top ?? (y as number),
            parentWidth: buttonRect?.width ?? 0,
            parentHeight: buttonRect?.height ?? 0,

            placement: menu.placement,

            marginX: menu.marginX,
            marginY: menu.marginY,

            relative: false,
          };
        } else if (parentRect) {
          opts = {
            ...opts,

            parentLeft: parentRect.x,
            parentTop: parentRect.y,
            parentWidth: parentRect.width,
            parentHeight: parentRect.height,

            marginX: MENU_MARGIN,

            placement:
              parent !== root && parent?.popup?.current
                ? parent.popup.current.placement
                : 'right-start',

            relative: true,
          };
        }

        list.popup.current = getPopupPosition(opts);

        if (parent) {
          list.popup.current.y += MENU_PADDING_Y;
        }

        setUp.current = true;
      }

      const popup = list.popup.current;

      if (popup) {
        setPosition(list.ref.current, popup.x, popup.y);
      }
    }, [menu, list, x, y]);

    return (
      <StyledMenuList
        ref={mergeRefs(list.ref, ref, list.ref)}
        tabIndex={-1}
        onKeyDown={mergeEvents(onKeyDown, list.props.onKeyDown)}
        onBlur={mergeEvents(onBlur, list.props.onBlur)}
        isOpen={menu?.isOpen}
        {...props}
      >
        {menu?.isOpen && (
          <MenuListContext.Provider value={list}>
            {children}
          </MenuListContext.Provider>
        )}
      </StyledMenuList>
    );
  },
);
