import React from 'react';

import { MenuContext, MenuListContext } from '~/menu/menu-context';
import { useMenuList } from '~/menu/use-menu-list';
import { getPopupPosition, PopupPositionerOptions } from '~/popup/popup';
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

        const preferedXPos = parent?.xPosition?.current || 'left';

        // let options: PopupPositionerOptions;

        // if (parent == null) {
        //   options = {
        //     width: el.offsetWidth,
        //     height: el.offsetHeight,

        //     parentX: buttonRect?.left,
        //     parentY: buttonRect?.top,
        //     parentWidth: buttonRect?.width,
        //     parentHeight: buttonRect?.height,

        //     horizontalPlacement: 'right',
        //     verticalPlacement: 'top-start',

        //     relative: false,

        //     // marginX: MENU_MARGIN,
        //     // marginY: MENU_PADDING_Y,
        //   };
        // } else {
        //   options = {
        //     width: el.offsetWidth,
        //     height: el.offsetHeight,

        //     parentX: parentRect?.x,
        //     parentY: parentRect?.y,
        //     parentWidth: parentRect?.width,
        //     parentHeight: parentRect?.height,

        //     marginX: MENU_MARGIN,
        //     marginY: MENU_PADDING_Y,

        //     horizontalPlacement: preferedXPos,
        //     verticalPlacement: 'top-start',

        //     relative: true,
        //   };
        // }

        // const popup = getPopupPosition(options);

        // console.log(el.clientWidth);

        // setTimeout(() => {
        //   let style = getComputedStyle(el);
        //   console.log(el.clientWidth);
        // }, 100);

        const popup = getPopupPosition({
          width: el.offsetWidth,
          height: el.offsetHeight,

          parentX: buttonRect?.left,
          parentY: buttonRect?.top,
          parentWidth: buttonRect?.width,
          parentHeight: buttonRect?.height,

          placement: 'bottom-start',

          marginX: 16,

          relative: false,
        });

        setPosition(list.ref.current, popup.x, popup.y);

        list.xPosition.current = popup.placement;
        setUp.current = true;
      }
    }, [menu, list, x, y]);

    // if (!menu?.isOpened) return null;

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
