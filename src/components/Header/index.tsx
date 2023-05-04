import React from 'react'
import Logo from '../UI/Logo'
import Dropdown from './components/Dropdown'
import Search from '../Search'
import Button from '../UI/Button'

import s from './index.module.scss'

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.left}>
                <Logo classname={s.item} />
                <Dropdown title={'Название'} classname={s.item} />
                <Dropdown title={'Название'} classname={s.item} />
                <Dropdown title={'Название'} classname={s.item} />
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