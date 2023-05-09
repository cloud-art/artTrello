import React, { useState } from 'react'
import s from './index.module.scss'
import InputText from '../../../UI/InputText'
import ButtonDefault from '../../../UI/ButtonDefault'
import Button from '../../../UI/Button'
import { FiX } from 'react-icons/fi'
import { IBoardItem } from '../../../../types/IBoard'
import classNames from 'classnames'

interface AddFormProps {
    title: string,
    addItemHandler?: (boardId: number, item: IBoardItem) => void,
    addBoardHandler?: (title: string) => void,
    setFormVisible: React.Dispatch<React.SetStateAction<boolean>>,
    boardId: number,
    classname?: string,
}

const AddForm: React.FC<AddFormProps> = ({ title, addItemHandler, addBoardHandler, boardId, classname, setFormVisible }) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)

    const onClickHandler = () => {
        if (value != '') {
            setError(false)
            addItemHandler &&
                addItemHandler(boardId, { id: 0, title: value })
            addBoardHandler &&
                addBoardHandler(value)
            setValue('')
        }
        else setError(true)
    }

    return (
        <form className={classNames(s.form, classname)}>
            <InputText errorMessage={error ? 'Введите название' : ''} value={value} onChange={(e) => { setValue(e.target.value) }}></InputText>
            <div className={s.footer}>
                <ButtonDefault color='blue' classname={s.buttonAdd} onClick={onClickHandler}>{title}</ButtonDefault>
                <Button classname={s.buttonClose} onClick={() => { setFormVisible(false) }}><FiX /></Button>
            </div>

        </form>
    )
}

export default AddForm