import React from 'react'
import Logo from '../UI/Logo'
import Dropdown from '../UI/Dropdown'
import Search from '../Search'
import Button from '../UI/Button'
import ButtonDefault from '../UI/ButtonDefault'
import { FiBell, FiHelpCircle, FiImage, FiMeh } from 'react-icons/fi'

import s from './index.module.scss'
import classNames from 'classnames'

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.left}>
                <Logo classname={s.item} />
                <Dropdown buttonContent={<ButtonDefault icon='chevronDown' classname={s.item}>Рабочие пространства</ButtonDefault>} />
                <Dropdown buttonContent={<ButtonDefault icon='chevronDown' classname={s.item}>Недавние</ButtonDefault>} />
                <Dropdown buttonContent={<ButtonDefault icon='chevronDown' classname={s.item}>В избранном</ButtonDefault>} />
                <Dropdown buttonContent={<ButtonDefault icon='chevronDown' classname={s.item}>Шаблоны</ButtonDefault>} />
                <ButtonDefault variant={'active'} classname={s.itemLastButton}>Создать</ButtonDefault>
            </div>
            <div className={s.right}>
                <Search classname={s.item} />
                <Dropdown buttonContent={<Button classname={classNames(s.item, s.buttonIcon)}><FiBell /></Button>} />
                <Dropdown buttonContent={<Button classname={classNames(s.item, s.buttonIcon)}><FiHelpCircle /></Button>} />
                <Dropdown buttonContent={<Button classname={classNames(s.item, s.buttonIcon)}><FiImage /></Button>} />
                <Dropdown buttonContent={<Button classname={classNames(s.item, s.buttonIcon)}><FiMeh /></Button>} />
            </div>
        </header>
    )
}

export default Header