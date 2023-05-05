import React from 'react'
import Logo from '../UI/Logo'
import Dropdown from '../UI/Dropdown'
import Search from '../Search'
import Button from '../UI/Button'
import ButtonDefault from '../UI/ButtonDefault'

import s from './index.module.scss'

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.left}>
                <Logo classname={s.item} />
                <Dropdown buttonContent={<ButtonDefault>Рабочие пространства</ButtonDefault>} classname={s.item} />
                <Dropdown buttonContent={<ButtonDefault>Недавние</ButtonDefault>} classname={s.item} />
                <Dropdown buttonContent={<ButtonDefault>В избранном</ButtonDefault>} classname={s.item} />
                <Dropdown buttonContent={<ButtonDefault>Шаблоны</ButtonDefault>} classname={s.item} />
            </div>
            <div className={s.right}>
                <Search classname={s.item} />
                <Button classname={s.item} />
                <Button classname={s.item} />
                <Button classname={s.item} />
            </div>
        </header>
    )
}

export default Header