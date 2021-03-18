import React from 'react';

import { DndContext } from '../../dnd/dnd-context';
import { DndEndResult, useDnd } from '../../dnd/use-dnd';

export interface DragDropProps {
  onDragEnd: (e: DndEndResult) => void;
  children?: React.ReactNode;
}

export const DragDrop: React.FC<DragDropProps> = ({ children, ...props }) => {
  const dnd = useDnd(props);

  return (
    <DndContext.Provider value={dnd}>
      {children}
      {dnd.isActive &&
        dnd.thumbRenderer.current?.({ style: dnd.thumbStyle }, dnd?.thumbRef)}
    </DndContext.Provider>
  );
};
