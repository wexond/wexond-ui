import React from 'react';

import { useDraggable } from '../../dnd/use-draggable';

export interface DraggableHandlerProps {
  onMouseDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
}

export interface DraggableProps {
  index: number;
  draggableId?: any;
  children?: (props: React.HTMLAttributes<HTMLElement>) => React.ReactNode;
}

export const Draggable: React.FC<DraggableProps> = ({ children, ...props }) => {
  const draggable = useDraggable(props);

  const _children =
    typeof children === 'function' ? children(draggable.props) : children;

  return <>{_children}</>;
};
