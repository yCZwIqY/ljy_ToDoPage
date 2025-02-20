'use client';
import React from 'react';
import useBoardsStore from '@/store/useBoardsStore';

const AddBoardButton = () => {
    const { addBoard } = useBoardsStore();
    const onAddNewBoard = () => {
        addBoard();
    };
    return (
        <button
            onClick={onAddNewBoard}
            className={`w-28 h-10 rounded-lg text-sm text-white shadow-lg
                        bg-mute-default hover:bg-mute-hover active:bg-mute-active`}
        >
            새 보드 추가
        </button>
    );
};

export default AddBoardButton;
