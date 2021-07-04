import React from 'react';

import { DraggableProps } from '../components/Draggable';
import { DndContext } from './dnd-context';
import { DndItem } from './use-dnd';

export const useDraggable = ({
  index,
  draggableId,
  onDragOver: _onDragOver,
  onDragLeave: _onDragLeave,
  setDataTransfer,
  isDisabled,
}: DraggableProps) => {
  const dnd = React.useContext(DndContext);

  const item: DndItem = React.useMemo(() => ({ index, draggableId }), [
    index,
    draggableId,
  ]);

  const onDragStart = React.useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      if (!dnd || isDisabled) return;

      dnd.startPoint.current = [e.pageX, e.pageY];
      dnd.dragItem.current = item;

      if (dnd.mode === 'thumb') {
        e.preventDefault();
      } else if (dnd.mode === 'thumb-native') {
        setDataTransfer?.(e.dataTransfer, dnd.dragItem.current);

        if (dnd.thumbRef.current) {
          const thumb = dnd.thumbRef.current;

          dnd.toggleThumb(true);

          const offset = dnd.getThumbOffset?.(thumb, dnd.dragItem.current);

          e.dataTransfer.setDragImage(
            thumb,
            offset?.[0] ?? 0,
            offset?.[1] ?? 0,
          );

          requestAnimationFrame(() => {
            dnd.toggleThumb(false);
          });
        }
      }

      dnd.onDragStart?.(item, e);
      dnd.setActive(true);
    },
    [dnd, item, setDataTransfer, isDisabled],
  );

  const onMouseUp = React.useCallback(
    (e: React.MouseEvent) => {
      if (isDisabled) return;
      e.stopPropagation();
      dnd?.finishDrag(item);
    },
    [dnd, item, isDisabled],
  );

  const onDragEnd = React.useCallback(
    (e: React.DragEvent) => {
      if (isDisabled) return;
      e.stopPropagation();
      dnd?.finishDrag(item);
    },
    [dnd, item, isDisabled],
  );

  const onMouseMove = React.useCallback(() => {
    if (
      !isDisabled &&
      dnd?.isActive &&
      dnd?.mode === 'thumb' &&
      dnd.dragItem.current
    ) {
      _onDragOver?.(dnd.dragItem.current);
    }
  }, [dnd, _onDragOver, isDisabled]);

  const onDragOver = React.useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      if (
        !isDisabled &&
        dnd?.isActive &&
        dnd?.mode === 'thumb-native' &&
        dnd.dragItem.current
      ) {
        e.preventDefault();
        console.log(e);
        _onDragOver?.(dnd.dragItem.current, e);
      }
    },
    [dnd, _onDragOver, isDisabled],
  );

  const onMouseLeave = React.useCallback(() => {
    if (
      !isDisabled &&
      dnd?.isActive &&
      dnd?.mode === 'thumb' &&
      dnd.dragItem.current
    ) {
      _onDragLeave?.(dnd.dragItem.current);
    }
  }, [dnd, _onDragLeave, isDisabled]);

  const onDragLeave = React.useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      if (
        !isDisabled &&
        dnd?.isActive &&
        dnd?.mode === 'thumb-native' &&
        dnd.dragItem.current
      ) {
        _onDragLeave?.(dnd.dragItem.current, e);
      }
    },
    [dnd, _onDragLeave, isDisabled],
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
      draggable: !isDisabled,
    },
  };
};
