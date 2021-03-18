import React from 'react';

import { setPosition } from '../utils/dom';
import { DragDropProps } from '../components/DragDrop';

export interface DndThumbRenderProps {
  style: React.CSSProperties;
}

export type DndThumbRenderer = (
  props: DndThumbRenderProps,
  ref: any,
) => React.ReactNode;

export const useDnd = (props: DragDropProps) => {
  const [isActive, setActive] = React.useState(false);

  const thumbRenderer = React.useRef<DndThumbRenderer | null>(null);
  const thumbRef = React.useRef<HTMLElement | null>(null);

  const updateThumb = React.useCallback((x: number, y: number) => {
    if (thumbRef.current) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const thumbWidth = thumbRef.current.clientWidth;
      const thumbHeight = thumbRef.current.clientHeight;

      let _x = Math.max(x, 0);
      let _y = Math.max(y, 0);

      if (x + thumbWidth > viewportWidth) {
        _x = viewportWidth - thumbWidth;
      }

      if (y + thumbHeight > viewportHeight) {
        _y = viewportHeight - thumbHeight;
      }

      setPosition(thumbRef.current, _x, _y);
    }
  }, []);

  const onMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (thumbRenderer.current) {
        updateThumb(e.pageX, e.pageY);
      }
    },
    [updateThumb],
  );

  const onMouseUp = React.useCallback((e: MouseEvent) => {
    setActive(false);
  }, []);

  React.useEffect(() => {
    if (isActive) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isActive, onMouseMove, onMouseUp]);

  return { isActive, setActive, thumbRef, thumbRenderer, updateThumb };
};
