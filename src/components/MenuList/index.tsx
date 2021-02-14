import React from 'react';

import { MenuContext, MenuListContext } from '~/menu/menu-context';
import { useMenuList } from '~/menu/use-menu-list';
import { getPopupPosition } from '~/popup/popup';
import { setPosition } from '~/utils/dom';
import { mergeEvents, mergeRefs } from '~/utils/react';
import { StyledMenuList } from './style';

export interface MenuListProps extends React.HTMLAttributes<HTMLUListElement> {
  x?: number;
  y?: number;
}

export const MENU_MARGIN = -4;
export const MENU_PADDING_Y = 4;

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

        const parentRect = parent?.ref?.current?.getBoundingClientRect();
        const buttonRect = menu.buttonRef.current?.getBoundingClientRect();

        const preferedXPos = parent?.xPosition?.current || 'left';

        const popup = getPopupPosition({
          width: el.offsetWidth,
          height: el.offsetHeight,

          parentX: parentRect?.x ?? buttonRect?.left,
          parentY: parentRect?.y ?? buttonRect?.top,
          parentWidth: parentRect?.width ?? buttonRect?.width,
          parentHeight: parentRect?.height ?? buttonRect?.height,

          horizontalPlacement: preferedXPos,
          relative: !!parentRect,
        });

        setPosition(list.ref.current, popup.x, popup.y);

        list.xPosition.current = popup.horizontalPlacement;
        setUp.current = true;
      }
    }, [menu, list, x, y]);

    if (!menu?.isOpened) return null;

    return (
      <StyledMenuList
        ref={mergeRefs(list.ref, ref, list.ref)}
        tabIndex={-1}
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
