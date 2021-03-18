import React from 'react';

import { DndContext } from '../../dnd/dnd-context';
import { DndEndResult, DndItem, useDnd } from '../../dnd/use-dnd';

export type DragDropProps = React.PropsWithChildren<{
  onDragEnd: (e: DndEndResult) => void;
  thumb?: (
    props: React.PropsWithChildren<{
      sourceItem: DndItem;
      style?: React.CSSProperties;
    }>,
    context?: any,
  ) => React.ReactElement;
  setDataTransfer?: (dataTransfer: DataTransfer, sourceItem: DndItem) => void;
}>;

export const DragDrop: React.FC<DragDropProps> = ({ children, ...props }) => {
  const dnd = useDnd(props);

  return (
    <DndContext.Provider value={dnd}>
      {children}
      {props.thumb?.(
        {
          sourceItem: dnd.dragItem.current as DndItem,
          style: dnd.thumbStyle,
        },
        dnd?.thumbRef,
      )}
    </DndContext.Provider>
  );
};
