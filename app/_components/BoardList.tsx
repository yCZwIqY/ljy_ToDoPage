'use client'
import React, {useEffect, useState} from 'react';
import BoardItem from "@/app/_components/BoardItem";
import useBoardsStore from "@/store/useBoardsStore";

const BoardList = () => {
    const {boards, lastId, initBoard, editBoard} = useBoardsStore();
    const [initComplete, setInitComplete] = useState(false);
    const [dragId, setDragId] = useState<number | null>(null);

    useEffect(() => {
        const board = localStorage.getItem('boards');
        const lastId = localStorage.getItem('lastId') ?? '0';
        if (board) {
            initBoard(JSON.parse(board), Number(lastId));
        }

        setInitComplete(true);
    }, []);


    useEffect(() => {
        if (initComplete) {
            localStorage.setItem('boards', JSON.stringify(boards));
            localStorage.setItem('lastId', lastId.toString());
        }
    }, [boards]);

    const onDragStart = (id: number) => {
        setDragId(id);
    }
    const onDrop = (e: React.DragEvent, targetId: number) => {
        e.preventDefault();

        if (!targetId || !dragId) return;
        const targetIdx = boards.findIndex(({id}) => id === targetId);

        const targetElement = e.currentTarget;
        const {left, width} = targetElement.getBoundingClientRect();
        const hoverMiddleX = left + width / 2;
        const dragOrder = boards.find(({id}) => id === dragId)?.order;
        let targetOrder = boards[targetIdx].order;

        if (e.clientX < hoverMiddleX) {
            if (targetIdx <= 0) {
                targetOrder = targetOrder / 2
            } else {
                targetOrder = (targetOrder > dragOrder ? (boards[targetIdx + 1].order - targetOrder) : targetOrder + (targetOrder - boards[targetIdx - 1].order)) / 2;
            }
        } else {
            targetOrder = targetIdx >= boards.length - 1 ? targetOrder + 1 : (boards[targetIdx + 1].order - targetOrder) / 2;
        }
        console.log(targetOrder)

        const dragItem = boards.find(({id}) => id === dragId)!;
        editBoard(dragId, {...dragItem, order: targetOrder});
    }


    return (
        <div className={'flex-1 overflow-y-hidden overflow-x-scroll bg-light-default m-10 p-10 rounded-lg flex gap-4'}>
            {boards.map(board => <BoardItem key={board.id}
                                            onDragStart={onDragStart}
                                            onDrop={onDrop}
                                            {...board}/>)}
        </div>
    );
};

export default BoardList;
