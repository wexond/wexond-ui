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

export type DndMode = 'thumb' | 'thumb-native';

export const useDnd = ({
  thumb,
  setDataTransfer,
  onDragEnd: _onDragEnd,
}: DragDropProps) => {
  const [isActive, setActive] = React.useState(false);
  const [isThumbVisible, toggleThumb] = React.useState(false);

  const startPoint = React.useRef<Point | null>(null);
  const dragItem = React.useRef<DndItem | null>(null);

  const thumbRef = React.useRef<HTMLElement | null>(null);

  const mode: DndMode = setDataTransfer ? 'thumb-native' : 'thumb';

  const updateThumb = React.useCallback(
    (x: number, y: number) => {
      if (mode === 'thumb' && thumbRef.current) {
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
    [mode],
  );

  const onMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (mode === 'thumb') {
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
    [mode, isThumbVisible, updateThumb],
  );

  const finishDrag = React.useCallback(
    (dest?: DndItem) => {
      if (dragItem.current && dest) {
        _onDragEnd?.({ source: dragItem.current, dest });
      }

      startPoint.current = null;

      setActive(false);
      toggleThumb(false);
    },
    [_onDragEnd],
  );

  const onMouseUp = React.useCallback(() => finishDrag(), [finishDrag]);

  const onDragEnd = React.useCallback(() => finishDrag(), [finishDrag]);

  React.useEffect(() => {
    if (isActive) {
      window.addEventListener('mousemove', onMouseMove);

      if (mode === 'thumb') {
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('blur', onMouseUp);
      } else {
        window.addEventListener('dragend', onDragEnd);
      }
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);

      if (mode === 'thumb') {
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('blur', onMouseUp);
      } else {
        window.removeEventListener('dragend', onDragEnd);
      }
    };
  }, [isActive, onMouseMove, onMouseUp, mode, onDragEnd]);

  const thumbStyle = React.useMemo<React.CSSProperties>(() => {
    return {
      position: 'fixed',
      display: isThumbVisible ? 'flex' : 'none',
      top: '100vh',
      left: 0,
      pointerEvents: 'none',
    };
  }, [isThumbVisible]);

  return {
    isActive,
    isThumbVisible,
    startPoint,
    dragItem,
    setActive,
    thumbRef,
    updateThumb,
    thumbStyle,
    finishDrag,
    mode,
    setDataTransfer,
  };
};
