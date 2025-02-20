'use client';
import React, { useEffect, useState } from 'react';
import BoardItem from '@/app/_components/BoardItem';
import useBoardsStore, { Board, DragItem } from '@/store/useBoardsStore';
import DnDProvider, { DragType } from '@/app/_components/DnDProvider';
import DnDItem from '@/app/_components/DnDItem';
import useTodoStore, { Todo } from '@/store/useTodoStore';

const BoardList = () => {
    const { boards, lastId, initBoard, editBoard } = useBoardsStore();
    const { todos, lastId: todoLastId, initTodo } = useTodoStore();
    const [initComplete, setInitComplete] = useState(false);
    const { editTodo } = useTodoStore();

    useEffect(() => {
        const board = localStorage.getItem('boards');
        const lastId = localStorage.getItem('lastId') ?? '0';
        if (board) {
            initBoard(JSON.parse(board), Number(lastId));
        }

        const todos = localStorage.getItem('todos');
        const todoLastId = localStorage.getItem('todoLastId') ?? '0';
        if (todos) {
            initTodo(JSON.parse(todos), Number(todoLastId));
        }

        setInitComplete(true);
    }, []);

    useEffect(() => {
        if (initComplete) {
            localStorage.setItem('boards', JSON.stringify(boards));
            localStorage.setItem('lastId', lastId.toString());
        }
    }, [boards]);

    useEffect(() => {
        if (initComplete) {
            localStorage.setItem('todos', JSON.stringify(todos));
            localStorage.setItem('todoLastId', todoLastId.toString());
        }
    }, [todos]);

    const onBoardMove = (target: Board) => {
        editBoard(target.id!, target);
    };

    const onTodoMove = (target: Todo) => {
        editTodo(target.id!, target);
    };

    return (
        <div
            className={
                'flex-1 overflow-y-hidden overflow-x-scroll bg-light-default m-10 p-14 rounded-lg flex gap-4'
            }
        >
            <DnDProvider
                id={'dashboard'}
                onBoardMove={onBoardMove}
                onTodoMove={onTodoMove}
            >
                {boards.map((board) => (
                    <DnDItem
                        key={`${lastId}-${board.id}-${board.order}`}
                        id={board.id!}
                        type={'board'}
                        target={board}
                        list={boards}
                    >
                        <BoardItem {...board} />
                    </DnDItem>
                ))}
            </DnDProvider>
        </div>
    );
};

export default BoardList;
