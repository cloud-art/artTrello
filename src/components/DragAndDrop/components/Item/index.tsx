import React, { useEffect, useRef, useState } from 'react'
import s from './index.module.scss'
import { FiCheck, FiEdit2, FiTrash } from 'react-icons/fi';
import Button from 'components/UI/Button';
import { IBoardItem } from 'types/IBoard';
import InputText from 'components/UI/InputText';
import useOnClickOutside from 'hooks/useOnClickOutside';

interface ItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    item: IBoardItem;
    boardId: number;
    deleteItemHandler: (boardId: number, itemId: number) => void;
    updateItemHandler: (boardId: number, itemId: number, title: string) => void;
}

const Item: React.FC<ItemProps> = ({ 
    boardId, 
    item, 
    deleteItemHandler, 
    updateItemHandler, 
    ...props
}) => {
    const [value, setValue] = useState(item.title)
    const [isEdit, setEdit] = useState(false)
    const itemRef = useRef(null)

    useOnClickOutside(itemRef, () => setEdit(false));

    const onEditHandler = () => {
        if (value !== ''){
            updateItemHandler(boardId, item.id, value)
            setEdit(false)
        } else {
            setEdit(false)
        }
    }

    useEffect(() => {
        setValue(item.title)
    }, [isEdit])

    return (
        <div className={s.item} ref={itemRef} {...props} draggable={isEdit? false : props.draggable} >
            {!isEdit && 
            <>
            <div className={s.text}>
                {item.title}
            </div>
            <div className={s.edit}>
                <Button classname={s.button} onClick={() => { setEdit(true) }}><FiEdit2/></Button>
                <Button classname={s.button} onClick={() => { deleteItemHandler(boardId, item.id) }}><FiTrash /></Button>
            </div>
            </> 
            }
            {isEdit &&
                <form className={s.form} onSubmit={(e) => {e.preventDefault(); onEditHandler()}}>
                    <InputText className={s.input} onSubmit={onEditHandler} value={value} onChange={(e) => {setValue(e.target.value)}}/>
                    <Button classname={s.button} onClick={onEditHandler}><FiCheck /></Button>
                </form>
            }
        </div>
    )
}

export default Item