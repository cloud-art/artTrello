import React from 'react'
import s from './index.module.scss'
import { FiTrash } from 'react-icons/fi';
import Button from '../../../UI/Button';
import { IBoardItem } from '../../../../types/IBoard';

interface ItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    item: IBoardItem;
    boardId: number;
    deleteItemHandler: (boardId: number, itemId: number) => void;
}

const Item: React.FC<ItemProps> = ({ boardId, item, deleteItemHandler, ...props }) => {
    return (
        <div className={s.item} {...props}>
            <div className={s.text}>{item.title}</div>
            <Button classname={s.button} onClick={() => { deleteItemHandler(boardId, item.id) }}><FiTrash /></Button>
        </div>
    )
}

export default Item