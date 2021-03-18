import React from 'react';

import { DraggableProps } from '../components/Draggable';
import { DndContext, DroppableContext } from './dnd-context';
import { useDnd } from './use-dnd';

export const useDraggable = (index: number, draggableId?: any) => {
  const dnd = React.useContext(DndContext);
  const droppable = React.useContext(DroppableContext);

  const onDragStart = React.useCallback((e: React.DragEvent) => {
    if (!dnd) return;

    e.preventDefault();

    dnd.dragItem.current = { index, draggableId };
    dnd.startPoint.current = [e.pageX, e.pageY];

    dnd.setActive(true);
  }, []);

  const onMouseUp = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    dnd?.finishDrag({ index, draggableId });
  }, []);

  return {
    props: { onDragStart, onMouseUp, draggable: true },
  };
};
