import React from 'react';

export interface UsePopupOptions {
  ref: React.MutableRefObject<HTMLElement | null>;
  visible: boolean;
  onHide?: () => void;
}

export const usePopup = ({ ref, visible, onHide }: UsePopupOptions) => {
  const timeout = React.useRef<number>();

  React.useEffect(() => {
    if (visible) {
      requestAnimationFrame(() => {
        ref.current?.focus();
      });
    }
  }, [visible, ref]);

  const onBlur = React.useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      const target = e.relatedTarget as Node;

      if (ref.current && onHide && !ref.current.contains(target)) {
        timeout.current = setTimeout(onHide);
      }
    },
    [ref, onHide],
  );

  const onFocus = React.useCallback(() => {
    clearTimeout(timeout.current);
  }, []);

  const focus = React.useCallback(() => {
    ref?.current?.focus();
  }, [ref]);

  React.useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, [onHide]);

  return { onBlur, onFocus, focus };
};
