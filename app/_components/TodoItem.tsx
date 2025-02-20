import React from 'react';
import dayjs from 'dayjs';
import useTodoStore, { Todo } from '@/store/useTodoStore';
import EditableText from '@/app/_components/EditableText';

interface TodoItemProps extends Todo {
    id: number;
}

const TodoItem = (todo: TodoItemProps) => {
    const { id, content, createdAt } = todo;
    const { editTodo, remoteTodo } = useTodoStore();

    const onDelete = () => {
        remoteTodo(id);
    };
    const onComplete = (value: string) => {
        editTodo(id, { ...todo, content: value, createdAt: new Date() });
    };

    return (
        <div
            className={
                'p-4 m-3 rounded-lg shadow-lg flex justify-between gap-2 text-body'
            }
        >
            <EditableText
                type={'textarea'}
                onComplete={onComplete}
                onDelete={onDelete}
                defaultValue={content}
            >
                <div>
                    <div className={'whitespace-break-spaces'}>{content}</div>
                    <div className={'text-sm text-mute-default mt-3'}>
                        {dayjs(createdAt).format('YYYY-MM-DD')}
                    </div>
                </div>
            </EditableText>
        </div>
    );
};

export default TodoItem;
