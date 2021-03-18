import React from 'react';

import { setPosition } from '../utils/dom';
import { DragDropProps } from '../components/DragDrop';
import { Point } from '../interfaces/point';
import { getDistance } from '../utils/box';

export interface DndEndResult {
  source: DndItem;
  dest: DndItem;
}

export interface DndItem {
  index: number;
  draggableId: any;
}

export interface DndThumbRenderProps {
  style: React.CSSProperties;
}

export type DndThumbRenderer = (
  props: DndThumbRenderProps,
  ref: any,
) => React.ReactNode;

export const useDnd = ({ onDragEnd }: DragDropProps) => {
  const [isActive, setActive] = React.useState(false);
  const [isThumbVisible, toggleThumb] = React.useState(false);

  const startPoint = React.useRef<Point | null>(null);
  const dragItem = React.useRef<DndItem | null>(null);

  const thumbRenderer = React.useRef<DndThumbRenderer | null>(null);
  const thumbRef = React.useRef<HTMLElement | null>(null);

  const isThumb = React.useCallback(() => {
    return thumbRenderer.current && thumbRef.current;
  }, []);

  const updateThumb = React.useCallback(
    (x: number, y: number) => {
      if (isThumb() && thumbRef.current) {
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
    },
    [isThumb],
  );

  const onMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (isThumb()) {
        updateThumb(e.pageX, e.pageY);

        if (
          !isThumbVisible &&
          startPoint.current &&
          getDistance(
            startPoint.current[0],
            startPoint.current[1],
            e.pageX,
            e.pageY,
          ) >= 5
        ) {
          return toggleThumb(true);
        }
      }
    },
    [isThumb, isThumbVisible, updateThumb],
  );

  const finishDrag = React.useCallback(
    (dest?: DndItem) => {
      if (dragItem.current && dest) {
        onDragEnd?.({ source: dragItem.current, dest });
      }

      startPoint.current = null;

      setActive(false);
      toggleThumb(false);
    },
    [onDragEnd],
  );

  const onMouseUp = React.useCallback(
    (e: MouseEvent) => {
      finishDrag();
    },
    [finishDrag],
  );

  React.useEffect(() => {
    if (isActive) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('blur', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.addEventListener('blur', onMouseUp);
    };
  }, [isActive, onMouseMove, onMouseUp]);

  const thumbStyle = React.useMemo<React.CSSProperties>(() => {
    return {
      position: 'fixed',
      display: isThumbVisible ? 'flex' : 'none',
      top: 0,
      left: 0,
    };
  }, [isThumbVisible]);

  return {
    isActive,
    isThumbVisible,
    startPoint,
    dragItem,
    setActive,
    thumbRef,
    thumbRenderer,
    updateThumb,
    thumbStyle,
    finishDrag,
  };
};
