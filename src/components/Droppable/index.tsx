import React from 'react';

import { DroppableContext } from '../../dnd/dnd-context';
import { useDroppable } from '../../dnd/use-droppable';

export interface DroppableHandlerProps {
  ref: React.MutableRefObject<HTMLElement | null>;
}

export interface DroppableProps {
  children: (props: DroppableHandlerProps) => React.ReactNode;
}

export const Droppable: React.FC<DroppableProps> = ({ children }) => {
  const droppable = useDroppable();

  const _children =
    typeof children === 'function'
      ? children({ ref: droppable.ref })
      : children;

  return (
    <DroppableContext.Provider value={droppable}>
      {_children}
    </DroppableContext.Provider>
  );
};
