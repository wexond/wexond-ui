import React from 'react';

import { DraggableProps } from '../components/Draggable';
import { DndContext } from './dnd-context';
import { DndItem } from './use-dnd';

export const useDraggable = ({
  index,
  draggableId,
  onDragOver: _onDragOver,
  onDragLeave: _onDragLeave,
}: DraggableProps) => {
  const dnd = React.useContext(DndContext);

  const item: DndItem = { index, draggableId };

  const onDragStart = React.useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      if (!dnd) return;

      dnd.startPoint.current = [e.pageX, e.pageY];
      dnd.dragItem.current = item;

      if (dnd.mode === 'thumb') {
        e.preventDefault();
      } else if (dnd.mode === 'thumb-native' && dnd.thumbRef.current) {
        const thumb = dnd.thumbRef.current;

        dnd.toggleThumb(true);

        const offset = dnd.getThumbOffset?.(thumb, dnd.dragItem.current);

        e.dataTransfer.setDragImage(thumb, offset?.[0] ?? 0, offset?.[1] ?? 0);

        dnd.setDataTransfer?.(e.dataTransfer, dnd.dragItem.current);

        requestAnimationFrame(() => {
          dnd.toggleThumb(false);
        });
      }

      dnd.onDragStart?.(item, e);
      dnd.setActive(true);
    },
    [dnd],
  );

  const onMouseUp = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      dnd?.finishDrag(item);
    },
    [dnd],
  );

  const onDragEnd = React.useCallback(
    (e: React.DragEvent) => {
      e.stopPropagation();
      dnd?.finishDrag(item);
    },
    [dnd],
  );

  const onMouseMove = React.useCallback(() => {
    if (dnd?.isActive && dnd?.mode === 'thumb' && dnd.dragItem.current) {
      _onDragOver?.(dnd.dragItem.current);
    }
  }, [dnd]);

  const onDragOver = React.useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      if (
        dnd?.isActive &&
        dnd?.mode === 'thumb-native' &&
        dnd.dragItem.current
      ) {
        e.preventDefault();
        _onDragOver?.(dnd.dragItem.current, e);
      }
    },
    [dnd],
  );

  const onMouseLeave = React.useCallback(() => {
    if (dnd?.isActive && dnd?.mode === 'thumb' && dnd.dragItem.current) {
      _onDragLeave?.(dnd.dragItem.current);
    }
  }, [dnd]);

  const onDragLeave = React.useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      if (
        dnd?.isActive &&
        dnd?.mode === 'thumb-native' &&
        dnd.dragItem.current
      ) {
        _onDragLeave?.(dnd.dragItem.current, e);
      }
    },
    [dnd],
  );

  return {
    props: {
      onDragStart,
      onMouseUp,
      onMouseMove,
      onDragOver,
      onDragEnd,
      onMouseLeave,
      onDragLeave,
      draggable: true,
    },
  };
};
