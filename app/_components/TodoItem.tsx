import React, { useState } from 'react';
import dayjs from 'dayjs';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import useTodoStore, { Todo } from '@/store/useTodoStore';

interface TodoItemProps extends Todo {
    id: number;
}

const TodoItem = (todo: TodoItemProps) => {
    const { id, content, createdAt } = todo;
    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(content);
    const { editTodo, remoteTodo } = useTodoStore();

    const onEdit = () => {
        setEditMode(true);
    };
    const onDelete = () => {
        remoteTodo(id);
    };
    const onComplete = () => {
        editTodo(id, { ...todo, content: inputValue, createdAt: new Date() });
        setEditMode(false);
    };

    return (
        <div
            className={
                'p-4 m-3 rounded-lg shadow-lg flex justify-between gap-2 text-body'
            }
        >
            {editMode ? (
                <>
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={'flex-1 border rounded-md resize-none'}
                        onBlur={onComplete}
                    ></textarea>
                    <button onClick={onComplete}>
                        <IoIosCheckmarkCircle />
                    </button>
                </>
            ) : (
                <>
                    <div>
                        <div className={'whitespace-break-spaces'}>
                            {content}
                        </div>
                        <div className={'text-sm text-mute-default mt-3'}>
                            {dayjs(createdAt).format('YYYY-MM-DD')}
                        </div>
                    </div>
                    <div>
                        <span>
                            <button onClick={onEdit}>
                                <MdEdit />
                            </button>
                            <button onClick={onDelete}>
                                <MdDelete />
                            </button>
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};

export default TodoItem;
