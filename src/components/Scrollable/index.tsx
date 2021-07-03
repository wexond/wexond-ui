import React from 'react';

import { mergeEvents, mergeRefs } from '../../utils/merge';

export interface ScrollableProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Scrollable = React.forwardRef<HTMLDivElement, ScrollableProps>(
  ({ children, onWheel, onKeyDown, ...props }, ref) => {
    const _ref = React.useRef<HTMLDivElement | null>(null);

    const _onWheel = React.useCallback((e: React.WheelEvent) => {
      if (!_ref.current) return;

      _ref.current.scrollTop = _ref.current.scrollTop + e.deltaY;
    }, []);

    const _onKeyDown = React.useCallback((e: React.KeyboardEvent) => {
      if (!_ref.current) return;

      if (e.key === 'Home') {
        _ref.current.scrollTop = 0;
      } else if (e.key === 'End') {
        _ref.current.scrollTop = _ref.current.scrollHeight;
      }
    }, []);

    return (
      <div
        ref={mergeRefs(ref, _ref)}
        {...mergeEvents({
          onWheel: [onWheel, _onWheel],
          onKeyDown: [onKeyDown, _onKeyDown],
        })}
        {...props}
      >
        {children}
      </div>
    );
  },
);
