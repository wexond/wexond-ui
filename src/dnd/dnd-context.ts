import React from 'react';

import { useDnd } from './use-dnd';
import { useDroppable } from './use-droppable';

export const DndContext = React.createContext<ReturnType<typeof useDnd> | null>(
  null,
);

export const DroppableContext = React.createContext<ReturnType<
  typeof useDroppable
> | null>(null);
