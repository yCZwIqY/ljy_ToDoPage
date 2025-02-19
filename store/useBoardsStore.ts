import {create} from "zustand/react";

export interface Board {
    id?: number;
    name: string;
    order?: number;
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
    addBoard: (name: string) => set((state) => {
        const id = state.lastId + 1;
        const order = state.boards.length;
        return ({boards: [...state.boards, {name, id, order}], lastId: id});
    }),
    editBoard: (targetId: number, newBoard: Board) => set((state) => ({
        boards: state.boards.map(board => board.id === targetId ? {
            ...board,
            ...newBoard
        } : board)
    })),
    removeBoard: (targetId: number) => set((state) => ({boards: state.boards.filter(({id}) => id !== targetId)})),
    initBoard:  (boards: Board[], lastId: number)  => set(() => ({boards, lastId}))
}));

export default useBoardsStore;

