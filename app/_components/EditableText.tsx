import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IoIosCheckmarkCircle } from 'react-icons/io';

interface EditableText {
    type?: 'text' | 'textarea';
    onComplete: (value: string) => void;
    onDelete: () => void;
    children: ReactNode;
    defaultValue: string;
}

const EditableText = ({
    type = 'text',
    onComplete,
    onDelete,
    children,
    defaultValue,
}: EditableText) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (editMode) {
            if (inputRef.current) inputRef.current.focus();
            if (textAreaRef.current) textAreaRef.current.focus();
        }
    }, [editMode]);

    const onEdit = () => {
        setEditMode(true);
    };

    const onSave = () => {
        setEditMode(false);
        onComplete(inputValue);
    };
    return (
        <div className={'flex-1 flex justify-between gap-2'}>
            {editMode ? (
                <>
                    {type === 'text' ? (
                        <input
                            className={
                                'w-full bg-transparent border-b-2 border-mute-default outline-none'
                            }
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    ) : (
                        <textarea
                            className={'flex-1 border rounded-md resize-none'}
                            ref={textAreaRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    )}
                    <button onClick={onSave}>
                        <IoIosCheckmarkCircle color={'#424874'} />
                    </button>
                </>
            ) : (
                <>
                    {children}
                    <span>
                        <button onClick={onEdit}>
                            <MdEdit color={'#424874'} />
                        </button>
                        <button onClick={onDelete}>
                            <MdDelete color={'#424874'} />
                        </button>
                    </span>
                </>
            )}
        </div>
    );
};

export default EditableText;
