'use client';
import React from 'react';
import useBoardsStore from '@/store/useBoardsStore';
import { BiPlus } from 'react-icons/bi';
import useTodoStore from '@/store/useTodoStore';
import TodoItem from '@/app/_components/TodoItem';
import DnDItem from '@/app/_components/DnDItem';
import EditableText from '@/app/_components/EditableText';

interface BoardItemProps {
    id: number;
    name: string;
    order: number;
}

const BoardItem = ({ id, name, order }: BoardItemProps) => {
    const { editBoard, removeBoard } = useBoardsStore();
    const { addTodo, getTodos } = useTodoStore();

    const onDelete = () => {
        removeBoard(id!);
    };
    const onComplete = (value: string) => {
        editBoard(id, { name: value, id, order });
    };

    const onAddTodo = () => {
        addTodo(id);
    };
    return (
        <div className={'min-w-96 h-full flex flex-col text-subtitle mb-3 '}>
            <div className={'flex justify-center items-start mb-3'}>
                <EditableText
                    onComplete={onComplete}
                    onDelete={onDelete}
                    defaultValue={name}
                >
                    <h3>{name}</h3>
                </EditableText>
                <button onClick={onAddTodo}>
                    <BiPlus color={'#424874'} />
                </button>
            </div>
            <div
                className={
                    'bg-white flex-1 rounded-lg shadow-md overflow-y-scroll p-2'
                }
            >
                {getTodos(id).map((todo) => (
                    <DnDItem
                        key={todo.id!}
                        id={todo.id!}
                        type={'todo'}
                        target={todo}
                        list={getTodos(id)}
                    >
                        <TodoItem {...todo} />
                    </DnDItem>
                ))}
            </div>
        </div>
    );
};

export default BoardItem;
