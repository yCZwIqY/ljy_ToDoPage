'use client'
import React, {useEffect, useState} from 'react';
import BoardItem from "@/app/_components/BoardItem";
import useBoardsStore from "@/store/useBoardsStore";

const BoardList = () => {
    const {boards, lastId, initBoard} = useBoardsStore();
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

    return (
        <div className={'flex-1 overflow-y-hidden overflow-x-scroll bg-light-default m-10 p-10 rounded-lg flex gap-4'}>
            {boards.map(board => <BoardItem key={board.id} {...board}/>)}
        </div>
    );
};

export default BoardList;
