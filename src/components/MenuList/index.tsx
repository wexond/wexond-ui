import React from 'react';
import { createPortal } from 'react-dom';
import { useDisableScrollButton } from '../../hooks/use-disable-scroll-button';

import { MenuContext, MenuListContext } from '../../menu/menu-context';
import { useMenuList } from '../../menu/use-menu-list';
import { getPopupPosition, PopupInfo, PopupOptions } from '../../popup/popup';
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
      onMouseDown,
      onMouseEnter,
      onBlur,
      onWheel,
      children,
      ...props
    },
    ref,
  ) => {
    const root = React.useContext(MenuContext);
    const { controller, containerRef, parentController } = useMenuList();

    const blurRef = React.useRef<HTMLDivElement | null>(null);

    React.useLayoutEffect(() => {
      const ref = controller.ref.current;

      if (!ref || !blurRef.current || !containerRef.current || !root) return;

      // the menu item that is a parent of this menu list
      const parentRect = ref.parentElement?.getBoundingClientRect();

      let opts: Partial<PopupOptions> = {};

      if (x != null && y != null) {
        opts = {
          parentLeft: x,
          parentTop: y,
          parentWidth: parentWidth,
          parentHeight: parentHeight,

          placement: root.props.placement,

          marginX: root.props.marginX,
          marginY: root.props.marginY,
        };
      } else if (parentRect && parentController != null) {
        // We are sure that it's a submenu

        opts = {
          parentLeft: parentRect.x,
          parentTop: parentRect.y,
          parentWidth: parentRect.width,
          parentHeight: parentRect.height,

          marginX: SUBMENU_MARGIN,
          marginY: -MENU_ITEM_MARGIN,

          placement: parentController.popupInfo.current!.placement,
        };
      }

      const BORDER_SIZE = 2;

      opts = {
        ...opts,
        width: ref.clientWidth + BORDER_SIZE,
        height: ref.clientHeight,
        maxWidth: root.props.maxWidth,
        maxHeight: root.props.maxHeight,
        insetY: 24,
        relative: false,
      };

      const popup = (controller.popupInfo.current = getPopupPosition(
        opts as any,
      ));

      ref.style.maxWidth = popup.maxWidth + 'px';
      ref.style.maxHeight = popup.maxHeight - MENU_LIST_PADDING_Y + 'px';
      containerRef.current.style.maxHeight = popup.maxHeight + 'px';

      blurRef.current.style.height =
        containerRef.current.clientHeight + MENU_LIST_PADDING_Y * 2 + 'px';

      setPosition(ref, popup.x, popup.y);
    }, [
      parentController,
      controller.popupInfo,
      containerRef,
      root,
      controller.ref,
      x,
      y,
      parentWidth,
      parentHeight,
    ]);

    const onKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        e.stopPropagation();

        if (e.key === 'Home') {
          containerRef.current.scrollTop = 0;
          return;
        } else if (e.key === 'End') {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
          return;
        }

        const index = controller.getFocusedIndex();
        const item = controller.itemsList.current[index];

        if (e.key === 'ArrowUp') {
          controller.focusPrevious();
        } else if (e.key === 'ArrowDown') {
          controller.focusNext();
        } else if (!item?.hasSubmenu && e.key === 'Enter') {
          //   // hoveredItem?.onSelect?.();
          //   // menu.toggle(false);
          //   // menu.buttonRef.current?.focus();
        } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
          controller.requestSubmenu(controller.getFocusedIndex());
        } else if (e.key === 'ArrowLeft' || e.key === 'Escape') {
          if (parentController) {
            parentController.hideSubmenu();
          } else if (e.key === 'Escape') {
            // menu.toggle(false);
            // menu.onClose?.();
            // menu.buttonRef?.current?.focus();
          }
        } else {
          controller.focusUsingText(e.key);
        }
      },
      [containerRef, controller, parentController],
    );

    React.useEffect(() => {
      controller.ref.current?.focus();
    }, [controller?.ref]);

    const el = (
      <StyledMenuList
        ref={controller.ref}
        tabIndex={-1}
        isOpen={true}
        onKeyDown={onKeyDown}
        {...props}
      >
        <BlurEffect ref={blurRef} />
        {true && (
          <Container ref={containerRef}>
            <MenuListContext.Provider value={controller}>
              {children}
            </MenuListContext.Provider>
          </Container>
        )}
      </StyledMenuList>
    );

    return parentController == null
      ? createPortal(el, document.getElementById('wexond-ui-menu-portal')!)
      : el;
  },
);

MenuList.defaultProps = {
  parentWidth: 0,
  parentHeight: 0,
};
