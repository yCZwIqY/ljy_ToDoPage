import { DragItem } from '@/store/useBoardsStore';
import { create } from 'zustand/react';

export interface Todo extends DragItem {
    content: string;
    createdAt: Date;
    boardId: number;
}

interface TodoStore {
    todos: Todo[];
    lastId: number;
    addTodo: (boardId: number) => void;
    getTodos: (boardId: number) => Todo[];
    editTodo: (targetId: number, todo: Todo) => void;
    remoteTodo: (targetId: number) => void;
    initTodo: (todos: Todo[], lastId: number) => void;
}

const useTodoStore = create<TodoStore>((set, get) => ({
    todos: [],
    lastId: 0,
    addTodo: (boardId: number) =>
        set((state) => {
            const order =
                get().todos.filter((it) => it.boardId === boardId).length + 1;
            const lastId = state.lastId + 1;
            const todo = {
                content: '새 할일 ' + lastId,
                boardId,
                order,
                id: lastId,
                createdAt: new Date(),
            };
            return { todos: [...state.todos, todo], lastId };
        }),
    getTodos: (boardId: number) =>
        get().todos.filter((it) => it.boardId === boardId),
    editTodo: (targetId: number, todo: Todo) =>
        set((state) => ({
            todos: state.todos
                .map((it) => (it.id === targetId ? { ...it, ...todo } : it))
                .sort((a, b) => a.order - b.order),
        })),
    remoteTodo: (targetId: number) =>
        set((state) => ({
            todos: state.todos.filter((it) => it.id !== targetId),
        })),
    initTodo: (todos: Todo[], lastId: number) => set(() => ({ todos, lastId })),
}));

export default useTodoStore;
