import React from 'react'
import s from './index.module.scss'
import Button from '../Button'
import { FiChevronDown } from 'react-icons/fi'
import classNames from 'classnames';

interface DropdownButtonProps {
    icon?: 'chevronDown';
    variant?: 'active';
    classname?: string;
}

const DropdownButton: React.FC<React.PropsWithChildren<DropdownButtonProps>> = ({
    children,
    icon,
    variant,
    classname,
}) => {

    return (
        <Button classname={classNames(s.openButton, variant === 'active' && s.openButtonActive, classname)}>
            {children}
            {icon === 'chevronDown' && <FiChevronDown className={s.image} />}
        </Button>
    )
}

export default DropdownButton