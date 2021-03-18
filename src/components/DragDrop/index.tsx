import React from 'react';

import { DndContext } from '../../dnd/dnd-context';
import { useDnd } from '../../dnd/use-dnd';

export interface DragDropProps {}

export const DragDrop: React.FC<DragDropProps> = ({ children, ...props }) => {
  const dnd = useDnd(props);

  return (
    <DndContext.Provider value={dnd}>
      {children}
      {dnd.isActive &&
        dnd.thumbRenderer.current?.(
          { style: { position: 'fixed', top: 0, left: 0 } },
          dnd?.thumbRef,
        )}
    </DndContext.Provider>
  );
};
