import React from 'react';

import { DndContext } from '../../dnd/dnd-context';
import { DndEndResult, DndItem, DndMode, useDnd } from '../../dnd/use-dnd';
import { Point } from '../../interfaces';

export type DragDropProps = React.PropsWithChildren<{
  onDragStart?: (sourceItem: DndItem, e?: React.DragEvent<HTMLElement>) => void;
  onDragEnd: (e: DndEndResult) => void;
  thumb?: (
    props: React.PropsWithChildren<{
      sourceItem: DndItem;
      style?: React.CSSProperties;
    }>,
    context?: any,
  ) => React.ReactElement;
  getThumbOffset?: (thumbRef: HTMLElement, sourceItem: DndItem) => Point;
  setDataTransfer?: (dataTransfer: DataTransfer, sourceItem: DndItem) => void;
  mode?: DndMode;
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

DragDrop.defaultProps = {
  mode: 'thumb',
};
