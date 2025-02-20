import React, { createContext, ReactNode, useState } from 'react';
import { Board, DragItem } from '@/store/useBoardsStore';
import { Todo } from '@/store/useTodoStore';

export type DragType = 'board' | 'todo';

interface DnDProviderProps {
    children: ReactNode;
    onBoardMove: (target: Board) => void;
    onTodoMove: (target: Todo) => void;
}

interface DndContextValue {
    onDragStart: (e: React.DragEvent, target: DragItem, type: DragType) => void;
    onDrop: (
        e: React.DragEvent,
        type: DragType,
        target: DragItem,
        list: DragItem[],
    ) => void;
}

export const DndContext = createContext<DndContextValue>({
    onDragStart: (e: React.DragEvent, target: DragItem, type: DragType) => {},
    onDrop: (
        e: React.DragEvent,
        type: DragType,
        target: DragItem,
        list: DragItem[],
    ) => {},
});

const DnDProvider = ({
    onBoardMove,
    onTodoMove,
    children,
}: DnDProviderProps) => {
    const [dragTarget, setDragTarget] = useState<DragItem | null>(null);
    const [dragType, setDragType] = useState<DragType | null>(null);

    const LAST_ORDER = 999;

    const onDragStart = (e, target: DragItem, type: DragType) => {
        e.stopPropagation();
        setDragTarget(target);
        setDragType(type);
    };

    const onDrop = (
        e: React.DragEvent,
        dropType: DragType,
        dropTarget: DragItem,
        list: DragItem[],
    ) => {
        e.preventDefault();
        e.stopPropagation();

        if (!dragTarget || !dropTarget) return;

        if (dragType === 'todo' && dropType === 'todo') {
            if ((dragTarget as Todo).boardId === (dropTarget as Todo).boardId) {
                onTodoMove(
                    getMovedTarget(e, 'ver', dragTarget, dropTarget, list),
                );
            } else {
                onTodoMove({
                    ...getMovedTarget(e, 'ver', dragTarget, dropTarget, list),
                    boardId: (dropTarget as Todo).boardId,
                } as Todo);
            }
        } else if (dragType === 'board' && dropType === 'board') {
            onBoardMove(getMovedTarget(e, 'hor', dragTarget, dropTarget, list));
        } else if (dragType === 'todo' && dropType === 'board') {
            onTodoMove({
                ...dragTarget,
                boardId: dropTarget.id,
                order: LAST_ORDER,
            } as Todo);
        }
    };

    const getMovedTarget = (
        e: React.DragEvent,
        dir: 'hor' | 'ver',
        dragTarget,
        dropTarget,
        list,
    ) => {
        const targetElement = e.currentTarget;
        const { left, width, top, height } =
            targetElement.getBoundingClientRect();
        const hoverMiddle = dir === 'hor' ? left + width / 2 : top + height / 2;
        const mousePos = dir === 'hor' ? e.clientX : e.clientY;
        const dragOrder = dragTarget.order;
        let targetOrder = dropTarget.order;

        const targetIdx = list.findIndex(({ id }) => id === dropTarget.id);
        if (mousePos < hoverMiddle) {
            if (targetIdx <= 0) {
                targetOrder = targetOrder / 2;
            } else {
                targetOrder =
                    (targetOrder > dragOrder
                        ? list[targetIdx + 1].order - targetOrder
                        : targetOrder +
                          (targetOrder - list[targetIdx - 1].order)) / 2;
            }
        } else {
            if (targetIdx >= list.length - 1) {
                targetOrder = targetOrder + 1;
            }
            targetOrder =
                targetOrder > dragOrder
                    ? targetOrder + (targetOrder - list[targetIdx - 1].order)
                    : (list[targetIdx + 1].order - targetOrder) / 2;
        }

        return { ...dragTarget, order: targetOrder };
    };

    return <DndContext value={{ onDragStart, onDrop }}>{children}</DndContext>;
};

export default DnDProvider;
