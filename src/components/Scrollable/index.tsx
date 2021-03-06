import React from 'react';

import { ComponentProps } from '../../core/component';
import { mergeEvents, mergeRefs } from '../../utils/merge';
import { StyledScrollable } from './style';

export interface ScrollableProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ComponentProps {}

export const Scrollable = React.forwardRef<HTMLDivElement, ScrollableProps>(
  ({ as, onWheel, onKeyDown, ...props }, ref) => {
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

    const Root = as || StyledScrollable;

    return (
      <Root
        ref={mergeRefs(ref, _ref)}
        {...mergeEvents({
          onWheel: [onWheel, _onWheel],
          onKeyDown: [onKeyDown, _onKeyDown],
        })}
        {...props}
      />
    );
  },
);
