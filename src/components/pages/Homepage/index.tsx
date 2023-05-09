import React from 'react'
import DragAndDrop from '../../DragAndDrop'
import s from './index.module.scss'

const Homepage = () => {
    return (
        <div className={s.homepage}>
            <DragAndDrop classname={s.dragAndDrop}></DragAndDrop>
        </div>
    )
}

export default Homepage