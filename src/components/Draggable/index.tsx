import React from 'react';
import { DndItem } from '../../dnd/use-dnd';

import { useDraggable } from '../../dnd/use-draggable';

export interface DraggableHandlerProps {
  onMouseDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
}

export interface DraggableProps {
  index: number;
  draggableId?: any;
  onDragOver?: (sourceItem: DndItem, e?: React.DragEvent<HTMLElement>) => void;
  onDragLeave?: (sourceItem: DndItem, e?: React.DragEvent<HTMLElement>) => void;
  setDataTransfer?: (dataTransfer: DataTransfer, sourceItem: DndItem) => void;
  isDisabled?: boolean;
  children?: (
    props: ReturnType<typeof useDraggable>['props'],
  ) => React.ReactNode;
}

export const Draggable: React.FC<DraggableProps> = ({ children, ...props }) => {
  const draggable = useDraggable(props);

  const _children =
    typeof children === 'function' ? children(draggable.props) : children;

  return <>{_children}</>;
};
