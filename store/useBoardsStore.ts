import { create } from 'zustand/react';

export interface DragItem {
    id?: number;
    order?: number;
}

export interface Board extends DragItem {
    name: string;
}

interface BoardStore {
    boards: Board[];
    lastId: number;
    addBoard: (name: string) => void;
    editBoard: (targetId: number, newBoard: Board) => void;
    removeBoard: (targetId: number) => void;
    initBoard: (boards: Board[], lastId: number) => void;
}

const useBoardsStore = create<BoardStore>((set) => ({
    boards: [],
    lastId: 0,
    addBoard: (name: string) =>
        set((state) => {
            const id = state.lastId + 1;
            const order = state.boards.length ? state.boards.length + 1 : 1;
            return {
                boards: [...state.boards, { name, id, order }],
                lastId: id,
            };
        }),
    editBoard: (targetId: number, newBoard: Board) =>
        set((state) => ({
            boards: state.boards
                .map((board) =>
                    board.id === targetId
                        ? {
                              ...board,
                              ...newBoard,
                          }
                        : board,
                )
                .sort((a, b) => a.order - b.order),
        })),
    removeBoard: (targetId: number) =>
        set((state) => ({
            boards: state.boards.filter(({ id }) => id !== targetId),
        })),
    initBoard: (boards: Board[]) =>
        set(() => ({
            boards: boards
                .sort((a, b) => a.order - b.order)
                .map((board, idx) => ({ ...board, order: idx + 1 })),
            lastId: boards.length,
        })),
}));

export default useBoardsStore;
