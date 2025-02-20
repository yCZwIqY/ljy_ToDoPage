import React, {ReactNode, useContext} from 'react';
import {DndContext} from "@/app/_components/DnDProvider";
import {DragItem} from "@/store/useBoardsStore";


interface DnDItemProps {
    id: number;
    onMoveItem: (id: number, item: DragItem) => void;
    children: ReactNode;
}

const DnDItem = ({id, onMoveItem, children}: DnDItemProps) => {
    const {id: boardId, dragId, onDrop, onDragStart} = useContext(DndContext);

    return (
        <div draggable
             onDragOver={e => e.preventDefault()}
             onDragStart={() => onDragStart(id)}
             onDrop={(e) => onDrop(e, boardId, id, onMoveItem)}
        >
            {children}
        </div>
    );
};

export default DnDItem;
