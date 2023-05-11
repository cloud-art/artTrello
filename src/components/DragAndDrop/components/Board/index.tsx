import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import s from './index.module.scss'
import Button from 'components/UI/Button';
import ButtonDefault from 'components/UI/ButtonDefault';
import { FiCheck, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';
import AddForm from '../AddForm';
import { IBoard } from 'types/IBoard';
import InputText from 'components/UI/InputText';
import useOnClickOutside from 'hooks/useOnClickOutside';

interface BoardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    board: IBoard;
    addItemHandler: (boardId: number, title: string) => void;
    deleteBoardHandler: (boardId: number) => void;
    updateBoardHandler: (boardId: number, title: string) => void;
}

const Board: React.FC<PropsWithChildren<BoardProps>> = ({ 
    board, 
    children, 
    addItemHandler, 
    deleteBoardHandler, 
    updateBoardHandler, 
    ...props 
}) => {
    const [isFormVisible, setFormVisible] = useState(false)
    const [value, setValue] = useState(board.title)
    const [isEdit, setEdit] = useState(false)
    const boardRef = useRef(null)

    useOnClickOutside(boardRef, () => setEdit(false));

    const onEditHandler = () => {
        if (value !== ''){
            updateBoardHandler(board.id, value)
            setEdit(false)
        } else {
            setEdit(false)
        }
    }

    useEffect(() => {
        setValue(board.title)
    }, [isEdit])

    return (
        <div className={s.board}>
            <div className={s.header} ref={boardRef} {...props} draggable={isEdit? false : props.draggable}>
                {!isEdit && 
                    <>
                    <div className={s.text}>
                        {board.title}
                    </div>
                    <div className={s.edit}>
                        <Button classname={s.buttonEdit} onClick={() => {setEdit(true)}}><FiEdit2 /></Button>
                        <Button classname={s.buttonEdit} onClick={() => { deleteBoardHandler(board.id) }}><FiTrash /></Button>
                    </div>
                    </>
                }
                {isEdit &&
                    <form className={s.formEdit} onSubmit={(e) => {e.preventDefault(); onEditHandler()}}>
                        <InputText className={s.input} onSubmit={onEditHandler} value={value} onChange={(e) => {setValue(e.target.value)}}/>
                        <Button classname={s.buttonEdit} onClick={onEditHandler}><FiCheck /></Button>
                    </form>
                }
            </div>
            <div className={s.content}>
                {children}
            </div>
            {isFormVisible && <AddForm title={'Добавить карточку'} classname={s.formCard} addItemHandler={addItemHandler} boardId={board.id} setFormVisible={setFormVisible} />}
            {!isFormVisible && <ButtonDefault color='grey' classname={s.buttonAdd} onClick={() => { setFormVisible(true) }}><FiPlus />Добавить карточку</ButtonDefault>}
        </div>
    )
}

export default Board