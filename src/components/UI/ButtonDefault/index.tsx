import React, { ButtonHTMLAttributes } from 'react'
import s from './index.module.scss'
import Button from '../Button'
import { FiChevronDown } from 'react-icons/fi'
import classNames from 'classnames';

interface DropdownButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: 'chevronDown';
    variant?: 'active';
    classname?: string;
    color?: 'grey' | 'blue';
}

const DropdownButton: React.FC<React.PropsWithChildren<DropdownButtonProps>> = ({
    children,
    icon,
    variant,
    classname,
    color,
    ...props
}) => {

    return (
        <Button
            classname={classNames(
                variant === 'active' && s.openButtonActive,
                color === 'grey' && s.grey,
                color === 'blue' && s.blue,
                s.openButton,
                classname
            )}
            {...props}
        >
            {children}
            {icon === 'chevronDown' && <FiChevronDown className={s.image} />}
        </Button>
    )
}

export default DropdownButton