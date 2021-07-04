import React from 'react';

import { ComponentProps } from '../../core/component';
import { MenuContext, MenuListContext } from '../../menu/menu-context';
import { useMenuList } from '../../menu/use-menu-list';
import { getPopupPosition, PopupOptions } from '../../popup/popup';
import { setPosition } from '../../utils/dom';
import { mergeEvents, mergeRefs } from '../../utils/merge';
import {
  StyledMenuList,
  BlurEffect,
  Container,
  MENU_LIST_PADDING_Y,
} from './style';

export interface MenuListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ComponentProps {
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
      onBlur,
      onWheel,
      children,
      as,
      ...props
    },
    ref,
  ) => {
    const root = React.useContext(MenuContext);
    const {
      controller,
      containerRef,
      parentController,
      props: listProps,
    } = useMenuList();

    const blurRef = React.useRef<HTMLDivElement | null>(null);

    React.useLayoutEffect(() => {
      const ref = controller.ref.current;

      if (!ref || !blurRef.current || !containerRef.current || !root) return;

      // the menu item that is a parent of this menu list
      const parentRect = ref.parentElement?.getBoundingClientRect();
      const btn = root.buttonRef.current;

      let opts: Partial<PopupOptions> = {};

      if (x != null && y != null) {
        opts = {
          parentLeft: x,
          parentTop: y,
          parentWidth: parentWidth,
          parentHeight: parentHeight,

          placement: root.props.placement ?? 'right-start',

          marginX: root.props.marginX,
          marginY: root.props.marginY,
        };
      } else if (parentController == null && btn != null) {
        opts = {
          parentLeft: btn.offsetLeft,
          parentTop: btn.offsetTop,
          parentWidth: btn.clientWidth,
          parentHeight: btn.clientHeight,

          placement: root.props.placement ?? 'bottom-start',

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

          placement:
            parentController.getParent() != null
              ? parentController.popupInfo.current!.placement
              : 'right-start',
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

    const _onKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!containerRef.current || !root) return;

        e.stopPropagation();
        e.preventDefault();

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
          item.onSelect?.(false);
          root.toggle(false);
        } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
          controller.requestSubmenu(controller.getFocusedIndex());
        } else if (e.key === 'ArrowLeft' || e.key === 'Escape') {
          if (parentController) {
            parentController.hideSubmenu();
          } else if (e.key === 'Escape') {
            root.toggle(false);
          }
        } else {
          controller.focusUsingText(e.key);
        }
      },
      [root, containerRef, controller, parentController],
    );

    const _onWheel = React.useCallback(
      (e: React.WheelEvent) => {
        if (!containerRef.current) return;

        e.stopPropagation();

        containerRef.current.scrollTop =
          containerRef.current.scrollTop + e.deltaY;
      },
      [containerRef],
    );

    React.useEffect(() => {
      if (parentController) {
        controller.ref.current?.focus();
      }
    }, [parentController, controller?.ref]);

    const Root = as || StyledMenuList;

    return (
      <Root
        ref={mergeRefs(ref, controller.ref) as any}
        tabIndex={-1}
        isOpen={root?.isOpen}
        {...mergeEvents({
          onKeyDown: [onKeyDown, _onKeyDown],
          onBlur: [onBlur, listProps.onBlur],
          onWheel: [onWheel, _onWheel],
        })}
        {...props}
      >
        <BlurEffect ref={blurRef} />
        {root?.isOpen && (
          <Container ref={containerRef}>
            <MenuListContext.Provider value={controller}>
              {children}
            </MenuListContext.Provider>
          </Container>
        )}
      </Root>
    );
  },
);

MenuList.defaultProps = {
  parentWidth: 0,
  parentHeight: 0,
};
