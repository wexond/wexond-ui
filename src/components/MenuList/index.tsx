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

      if (menu && lists != null && list.ref.current != null) {
        const parent = list?.globalIndex?.current == null ? lists[0] : null;

        const rect = list.ref.current.getBoundingClientRect();
        const parentRect = parent?.ref?.current?.getBoundingClientRect();
        const button = menu.buttonRef.current;

        const preferedXPos = parent?.xPosition?.current || 'right';

        let _x = x;
        let _y = y;

        if (parentRect != null) {
          _x =
            _x ??
            (preferedXPos === 'left' ? parentRect.left : parentRect.right);
          _y = _y ?? parentRect.top - MENU_PADDING_Y - 1;
        } else if (button) {
          _x = button.offsetLeft;
          _y = button.offsetTop + button.clientHeight;
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
            yMargin: parent == null ? -MENU_MARGIN : undefined,
            initialX: parentRect?.x,
            initialY: parentRect?.y,
          });

          list.xPosition.current = popup.xPos;

          setPosition(list.ref.current, popup.x, popup.y);
          setUp.current = true;
        }
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
