import React from 'react';

export interface UsePopupOptions {
  ref: React.RefObject<any>;
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
      if (!ref.current.contains(e.relatedTarget)) {
        if (onHide) {
          timeout.current = setTimeout(onHide);
        }
      }
    },
    [ref, onHide],
  );

  const onFocus = React.useCallback(() => {
    clearTimeout(timeout.current);
  }, []);

  const focus = React.useCallback(() => {
    ref.current.focus();
  }, [ref]);

  React.useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, [onHide]);

  return { onBlur, onFocus, focus };
};
