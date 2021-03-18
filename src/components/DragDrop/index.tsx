import React from 'react';

import { DndContext } from '../../dnd/dnd-context';
import { DndEndResult, DndItem, useDnd } from '../../dnd/use-dnd';

export type DragDropProps = React.PropsWithChildren<{
  onDragEnd: (e: DndEndResult) => void;
  thumb?: (
    props: React.PropsWithChildren<{
      sourceItem: DndItem | null;
      style?: React.CSSProperties;
    }>,
    context?: any,
  ) => React.ReactElement;
}>;

export const DragDrop: React.FC<DragDropProps> = ({
  thumb,
  children,
  ...props
}) => {
  const dnd = useDnd(props);

  return (
    <DndContext.Provider value={dnd}>
      {children}
      {dnd.isActive &&
        thumb?.(
          { sourceItem: dnd.dragItem.current, style: dnd.thumbStyle },
          dnd?.thumbRef,
        )}
    </DndContext.Provider>
  );
};
