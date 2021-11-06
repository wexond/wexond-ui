import React from 'react';

export type UsePopupOptions<T extends (...args: any[]) => void> = {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  visible: boolean;
  focusOnShow?: boolean;
  onHide?: T;
};

export const usePopup = <T extends (...args: any[]) => void>({
  ref,
  visible,
  onHide,
  focusOnShow,
}: UsePopupOptions<T>) => {
  const timeout = React.useRef<number>();

  React.useEffect(() => {
    if (visible && (focusOnShow || focusOnShow === undefined)) {
      requestAnimationFrame(() => {
        ref.current?.focus();
      });
    }
  }, [visible, ref, focusOnShow]);

  const hide = React.useCallback(
    (...args: any[]) => {
      if (visible) onHide?.(...args);
    },
    [visible, onHide],
  );

  const onBlur = React.useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      const target = e.relatedTarget as Node;

      if (ref.current && hide && !ref.current.contains(target)) {
        timeout.current = setTimeout(hide) as any;
      }
    },
    [ref, hide],
  );

  const onFocus = React.useCallback(() => {
    clearTimeout(timeout.current);
  }, []);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        hide();
      }
    },
    [hide],
  );

  const focus = React.useCallback(() => {
    ref?.current?.focus();
  }, [ref]);

  React.useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, [hide]);

  return { onBlur, onFocus, onKeyDown, focus, hide: hide as T };
};
