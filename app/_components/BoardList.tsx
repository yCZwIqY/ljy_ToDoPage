'use client'
import React, {useEffect, useState} from 'react';
import BoardItem from "@/app/_components/BoardItem";
import useBoardsStore, {Board} from "@/store/useBoardsStore";
import DnDProvider from "@/app/_components/DnDProvider";
import DnDItem from "@/app/_components/DnDItem";

const BoardList = () => {
    const {boards, lastId, initBoard, editBoard} = useBoardsStore();
    const [initComplete, setInitComplete] = useState(false);

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

    const onMoveItem = (id: number, board: Board) => {
        editBoard(id, board);
    }

    return (
        <div className={'flex-1 overflow-y-hidden overflow-x-scroll bg-light-default m-10 p-10 rounded-lg flex gap-4'}>
            <DnDProvider id={'dashboard'} list={boards}>
                {boards.map(board => <DnDItem key={board.id} id={board.id!} onMoveItem={onMoveItem}>
                    <BoardItem {...board}/>
                </DnDItem>)}
            </DnDProvider>

        </div>
    );
};

export default BoardList;
