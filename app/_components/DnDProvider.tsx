import React, {createContext, ReactNode, useState} from 'react';
import {DragItem} from "@/store/useBoardsStore";

interface DnDProviderProps {
    id: string;
    children: ReactNode;
    list: DragItem[];
    direction?: 'horizontal' | 'vertical';
}

interface DndContextValue {
    id: string;
    dragId: null | number;
    onDragStart: (id: number) => void;
    onDrop: (e: React.DragEvent, boardId: string, targetId: number, callback) => void;
}

export const DndContext = createContext<DndContextValue>({
    id: '',
    dragId: null,
    onDragStart: (id: number) => {
    },
    onDrop: (e: React.DragEvent, boardId: string, targetId: number, callback) => {
    }

});

const DnDProvider = ({id, list, direction = 'horizontal', children}: DnDProviderProps) => {
    const [dragId, setDragId] = useState<number | null>(null);

    const onDragStart = (id: number) => {
        setDragId(id);
    }

    const onDrop = (e: React.DragEvent, boardId: string, targetId: number, callback) => {
        e.preventDefault();
        e.stopPropagation();

        if (!targetId || !dragId || id !== boardId) return;
        const targetIdx = list.findIndex(({id}) => id === targetId);

        const targetElement = e.currentTarget;
        const {left, width, top, height} = targetElement.getBoundingClientRect();
        const hoverMiddle = direction === 'horizontal' ? (left + width / 2) : (top + height / 2);
        const mousePos = direction === 'horizontal' ? e.clientX : e.clientY;
        const dragOrder = list.find(({id}) => id === dragId)?.order;
        let targetOrder = list[targetIdx].order;

        if (mousePos < hoverMiddle) {
            if (targetIdx <= 0) {
                targetOrder = targetOrder / 2
            } else {
                targetOrder = (targetOrder > dragOrder ? (list[targetIdx + 1].order - targetOrder) : targetOrder + (targetOrder - list[targetIdx - 1].order)) / 2;
            }
        } else {
            if (targetIdx >= list.length - 1) {
                targetOrder = targetOrder + 1;
            }
            targetOrder = targetOrder > dragOrder ? targetOrder + (targetOrder - list[targetIdx - 1].order) : (list[targetIdx + 1].order - targetOrder) / 2;
        }

        const dragItem = list.find(({id}) => id === dragId)!;

        callback(dragId, {...dragItem, order: targetOrder})
    }

    return (
        <DndContext value={{id, dragId, onDragStart, onDrop}}>
            {children}
        </DndContext>
    );
};

export default DnDProvider;
