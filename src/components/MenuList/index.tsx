import React from 'react';

import { MenuContext, MenuListContext } from '~/menu/menu-context';
import { useMenuList } from '~/menu/use-menu-list';
import { getPopupPosition } from '~/popup/popup-utils';
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

      if (lists != null && list.listRef.current != null) {
        const parent = lists[lists.length - 1];

        const rect = list.listRef.current.getBoundingClientRect();
        const parentRect = list.listRef.current.parentElement?.getBoundingClientRect();

        const preferedXPos = parent?.xPosRef?.current || 'right';

        let _x = x;
        let _y = y;

        if (parentRect != null) {
          _x =
            _x ??
            (preferedXPos === 'left' ? parentRect.left : parentRect.right);
          _y = _y ?? parentRect.top - MENU_PADDING_Y - 1;
        }

        if (_x != null && _y != null) {
          const popup = getPopupPosition({
            x: _x,
            y: _y,
            width: rect.width,
            height: rect.height,
            preferXPos: preferedXPos,
            preferYPos: 'top',
            parentX: parentRect?.x,
            parentWidth: parentRect?.width,
            xMargin: parentRect != null ? MENU_MARGIN : 0,
            initialX: parentRect?.x,
            initialY: parentRect?.y,
          });

          list.xPosRef.current = popup.xPos;

          setPosition(list.listRef.current, popup.x, popup.y);
          setUp.current = true;
        }
      }
    }, [menu?.visibleLists, list, x, y]);

    return (
      <StyledMenuList
        ref={mergeRefs(list.listRef, ref, list.listRef)}
        tabIndex={-1}
        visible={true}
        onKeyDown={mergeEvents(onKeyDown, list.props.onKeyDown)}
        onMouseEnter={list.props.onMouseEnter}
        // visible={menu.isOpened}
        {...props}
      >
        <MenuListContext.Provider value={list}>
          {children}
        </MenuListContext.Provider>
      </StyledMenuList>
    );
  },
);
