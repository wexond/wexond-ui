import React from 'react';

import { DndThumbRenderer } from '../../dnd/use-dnd';
import { useDraggable } from '../../dnd/use-draggable';

export interface DraggableHandlerProps {
  onMouseDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
}

export interface DraggableProps {
  thumb?: DndThumbRenderer;
  children: (props: DraggableHandlerProps) => React.ReactNode;
}

export const Draggable: React.FC<DraggableProps> = ({ thumb, children }) => {
  const draggable = useDraggable(thumb);

  const _children =
    typeof children === 'function'
      ? children({ onMouseDown: draggable.onMouseDown })
      : children;

  return <>{_children}</>;
};
