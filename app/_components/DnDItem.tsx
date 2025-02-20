import React, { ReactNode, useContext } from 'react';
import { DndContext, DragType } from '@/app/_components/DnDProvider';
import { DragItem } from '@/store/useBoardsStore';

interface DnDItemProps {
    id: number;
    target: DragItem;
    type: DragType;
    list: DragItem[];
    children: ReactNode;
}

const DnDItem = ({ target, type, list, children }: DnDItemProps) => {
    const { onDrop, onDragStart } = useContext(DndContext);

    return (
        <div
            draggable
            onDragOver={(e) => e.preventDefault()}
            onDragStart={(e) => onDragStart(e, target, type)}
            onDrop={(e) => onDrop(e, type, target, list)}
        >
            {children}
        </div>
    );
};

export default DnDItem;
