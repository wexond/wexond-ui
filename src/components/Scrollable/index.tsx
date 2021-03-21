import React from 'react';

import { mergeRefs } from '../../utils/react';

export interface ScrollableProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Scrollable = React.forwardRef<HTMLDivElement, ScrollableProps>(
  ({ children, ...props }, ref) => {
    const _ref = React.useRef<HTMLDivElement | null>(null);

    const onWheel = React.useCallback((e: React.WheelEvent) => {
      if (!_ref.current) return;

      _ref.current.scrollTop = _ref.current.scrollTop + e.deltaY;
    }, []);

    const onKeyDown = React.useCallback((e: React.KeyboardEvent) => {
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
        onWheel={onWheel}
        onKeyDown={onKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  },
);
