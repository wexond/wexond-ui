import React from 'react';

import { DndThumbRenderer } from '../../dnd/use-dnd';
import { useDraggable } from '../../dnd/use-draggable';

export interface DraggableHandlerProps {
  onMouseDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
}

export interface DraggableProps {
  index: number;
  draggableId?: any;
  thumb?: DndThumbRenderer;
  children: (props: React.HTMLAttributes<HTMLElement>) => React.ReactNode;
}

export const Draggable: React.FC<DraggableProps> = ({
  thumb,
  index,
  draggableId,
  children,
}) => {
  const draggable = useDraggable(index, draggableId, thumb);

  const _children =
    typeof children === 'function' ? children(draggable.props) : children;

  return <>{_children}</>;
};
