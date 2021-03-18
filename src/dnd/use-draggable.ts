import React from 'react';

import { DraggableProps } from '../components/Draggable';
import { DndContext, DroppableContext } from './dnd-context';
import { DndItem } from './use-dnd';

export const useDraggable = ({
  index,
  draggableId,
  onDragEnter: _onDragEnter,
  onDragLeave: _onDragLeave,
}: DraggableProps) => {
  const dnd = React.useContext(DndContext);
  const droppable = React.useContext(DroppableContext);

  const item: DndItem = { index, draggableId };

  const onDragStart = React.useCallback((e: React.DragEvent) => {
    if (!dnd) return;

    dnd.startPoint.current = [e.pageX, e.pageY];
    dnd.dragItem.current = item;

    if (dnd.mode === 'thumb') {
      e.preventDefault();
    } else if (dnd.mode === 'thumb-native' && dnd.thumbRef.current) {
      const thumb = dnd.thumbRef.current;

      thumb.style.display = 'flex';

      e.dataTransfer.setDragImage(thumb, 0, 0);
      dnd.setDataTransfer?.(e.dataTransfer, dnd.dragItem.current);

      requestAnimationFrame(() => {
        thumb.style.display = 'none';
      });
    }

    dnd.setActive(true);
  }, []);

  const onMouseUp = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    dnd?.finishDrag(item);
  }, []);

  const onDragEnd = React.useCallback(
    (e: React.DragEvent) => {
      e.stopPropagation();
      dnd?.finishDrag(item);
    },
    [dnd],
  );

  const onMouseMove = React.useCallback(() => {
    if (dnd?.isActive && dnd?.mode === 'thumb' && dnd.dragItem.current) {
      _onDragEnter?.(dnd.dragItem.current);
    }
  }, [dnd]);

  const onDragOver = React.useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      if (
        dnd?.isActive &&
        dnd?.mode === 'thumb-native' &&
        dnd.dragItem.current
      ) {
        _onDragEnter?.(dnd.dragItem.current, e);
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
