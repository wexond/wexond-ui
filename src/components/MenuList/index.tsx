import React from 'react';

import { MenuContext, MenuListContext } from '~/menu/menu-context';
import { useMenuList } from '~/menu/use-menu-list';
import { getPopupPosition, PopupOptions } from '~/popup/popup';
import { setPosition } from '~/utils/dom';
import { mergeEvents, mergeRefs } from '~/utils/react';
import { StyledMenuList } from './style';

export interface MenuListProps extends React.HTMLAttributes<HTMLUListElement> {
  x?: number;
  y?: number;
}

export const MENU_MARGIN = -4;
export const MENU_PADDING_Y = -4;

export const MenuList = React.forwardRef<HTMLUListElement, MenuListProps>(
  ({ x, y, onKeyDown, onMouseEnter, children, ...props }, ref) => {
    const menu = React.useContext(MenuContext);
    const list = useMenuList();

    const setUp = React.useRef(false);

    React.useLayoutEffect(() => {
      if (setUp.current) return;

      const lists = menu?.visibleLists.current;
      const el = list.ref.current;

      if (menu && lists != null && el != null) {
        const parent =
          list?.globalIndex?.current == null ? lists[lists.length - 1] : null;

        const parentRect = list?.ref?.current?.parentElement?.getBoundingClientRect();
        const buttonRect = menu.buttonRef.current?.getBoundingClientRect();

        let opts: Partial<PopupOptions> = {
          width: el.offsetWidth,
          height: el.offsetHeight,
        };

        if (parent == null && buttonRect) {
          opts = {
            ...opts,

            parentLeft: buttonRect.left,
            parentTop: buttonRect.top + MENU_PADDING_Y,
            parentWidth: buttonRect.width,
            parentHeight: buttonRect.height,

            placement: 'bottom',

            marginX: 16,
            marginY: 16,

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

            placement: parent?.placement?.current || 'right-start',

            relative: true,
          };
        }

        console.log(
          list.ref.current,
          opts.placement,
          parent?.placement?.current,
        );

        const popup = getPopupPosition(opts as PopupOptions);

        setPosition(list.ref.current, popup.x, popup.y + MENU_PADDING_Y);

        if (parent) {
          list.placement.current = popup.placement;
        }

        setUp.current = true;
      }
    }, [menu, list, x, y]);

    if (!menu?.isOpened) return null;

    return (
      <StyledMenuList
        ref={mergeRefs(list.ref, ref, list.ref)}
        tabIndex={-1}
        id={`xd-${list.id}`}
        onKeyDown={mergeEvents(onKeyDown, list.props.onKeyDown)}
        // onBlur={list.props.onBlur}
        {...props}
      >
        <MenuListContext.Provider value={list}>
          {children}
        </MenuListContext.Provider>
      </StyledMenuList>
    );
  },
);
