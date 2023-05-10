import React, { PropsWithChildren, useState } from 'react'
import s from './index.module.scss'
import Button from 'components/UI/Button';
import ButtonDefault from 'components/UI/ButtonDefault';
import { FiPlus, FiTrash } from 'react-icons/fi';
import AddForm from '../AddForm';
import { IBoard, IBoardItem } from 'types/IBoard';

interface BoardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    board: IBoard;
    addItemHandler: (boardId: number, item: IBoardItem) => void;
    deleteBoardHandler: (boardId: number) => void;
}

const Board: React.FC<PropsWithChildren<BoardProps>> = ({ board, children, addItemHandler, deleteBoardHandler, ...props }) => {
    const [isFormVisible, setFormVisible] = useState(false)
    return (
        <div className={s.board}>
            <div className={s.header} {...props}>
                {board.title}
                <Button classname={s.buttonDelete} onClick={() => { deleteBoardHandler(board.id) }}><FiTrash /></Button>
            </div>
            <div className={s.content}>
                {children}
            </div>
            {isFormVisible && <AddForm title={'Добавить карточку'} classname={s.form} addItemHandler={addItemHandler} boardId={board.id} setFormVisible={setFormVisible} />}
            {!isFormVisible && <ButtonDefault color='grey' classname={s.buttonAdd} onClick={() => { setFormVisible(true) }}><FiPlus />Добавить карточку</ButtonDefault>}
        </div>
    )
}

export default Board