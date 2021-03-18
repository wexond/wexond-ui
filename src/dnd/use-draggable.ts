import React from 'react';
import ReactDOM from 'react-dom';

import { DraggableProps } from '../components/Draggable';
import { DndContext, DroppableContext } from './dnd-context';
import { DndThumbRenderer, useDnd } from './use-dnd';

export const useDraggable = (thumbRenderer?: DndThumbRenderer) => {
  const dnd = React.useContext(DndContext);
  const droppable = React.useContext(DroppableContext);

  const onMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      // console.log(R);
      dnd.thumbRenderer.current = thumbRenderer;
      dnd?.setActive(true);
      requestAnimationFrame(() => {
        dnd?.updateThumb(e.pageX, e.pageY);
      });
    },
    [thumbRenderer, dnd],
  );

  return { onMouseDown };
};
