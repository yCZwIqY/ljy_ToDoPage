'use client';
import React, { useEffect, useRef, useState } from 'react';
import useBoardsStore from '@/store/useBoardsStore';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { BiPlus } from 'react-icons/bi';
import useTodoStore, { Todo } from '@/store/useTodoStore';
import TodoItem from '@/app/_components/TodoItem';
import DnDProvider from '@/app/_components/DnDProvider';
import DnDItem from '@/app/_components/DnDItem';

interface BoardItemProps {
    id: number;
    name: string;
}

const BoardItem = ({ id, name }: BoardItemProps) => {
    const { editBoard, removeBoard } = useBoardsStore();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(name);
    const inputRef = useRef<HTMLInputElement>(null);
    const { addTodo, getTodos, editTodo } = useTodoStore();

    useEffect(() => {
        if (editMode && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editMode]);

    const onChange = (e) => {
        setInputValue(e.target.value);
    };

    const onEdit = () => {
        setEditMode(true);
    };

    const onDelete = () => {
        removeBoard(id!);
    };
    const onComplete = () => {
        editBoard(id!, { name: inputValue });
        setEditMode(false);
    };

    const onAddTodo = () => {
        addTodo(id);
    };
    const onMoveItem = (id: number, todo: Todo) => {
        editTodo(id, todo);
    };

    return (
        <div className={'min-w-96 h-full flex flex-col text-subtitle mb-3 '}>
            <div className={'flex justify-between mb-3'}>
                {editMode ? (
                    <>
                        <input
                            className={
                                'bg-transparent border-none outline-none underline underline-offset-4'
                            }
                            ref={inputRef}
                            value={inputValue}
                            onChange={onChange}
                            onBlur={onComplete}
                        />
                        <button onClick={onComplete}>
                            <IoIosCheckmarkCircle />
                        </button>
                    </>
                ) : (
                    <>
                        <h3>{name}</h3>
                        <span>
                            <button onClick={onEdit}>
                                <MdEdit />
                            </button>
                            <button onClick={onDelete}>
                                <MdDelete />
                            </button>
                            <button onClick={onAddTodo}>
                                <BiPlus />
                            </button>
                        </span>
                    </>
                )}
            </div>
            <div
                className={
                    'bg-white flex-1 rounded-lg shadow-md overflow-y-scroll'
                }
            >
                <DnDProvider
                    id={id.toString()}
                    list={getTodos(id)}
                    direction={'vertical'}
                >
                    {getTodos(id).map((todo) => (
                        <DnDItem
                            key={todo.id!}
                            id={todo.id!}
                            onMoveItem={onMoveItem}
                        >
                            <TodoItem {...todo} />
                        </DnDItem>
                    ))}
                </DnDProvider>
            </div>
        </div>
    );
};

export default BoardItem;
