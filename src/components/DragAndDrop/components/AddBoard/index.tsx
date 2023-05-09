import React, { useState } from 'react'
import s from './index.module.scss'
import ButtonDefault from '../../../UI/ButtonDefault';
import { FiPlus } from 'react-icons/fi';
import AddForm from '../AddForm';

interface AddBoardProps {
    addBoardHandler: (title: string) => void;
}

const Board: React.FC<AddBoardProps> = ({ addBoardHandler }) => {
    const [isFormVisible, setFormVisible] = useState(false)
    const boardId = 0;

    return (
        <div className={s.addBoard}>
            {isFormVisible && <AddForm title={'Добавить список'} classname={s.form} addBoardHandler={addBoardHandler} boardId={boardId} setFormVisible={setFormVisible} />}
            {!isFormVisible && <ButtonDefault classname={s.button} onClick={() => { setFormVisible(true) }}><FiPlus />Добавить еще одну колонку</ButtonDefault>}
        </div>
    )
}

export default Board