import React, { ButtonHTMLAttributes } from 'react'
import s from './index.module.scss'
import Button from '../Button'
import { FiChevronDown } from 'react-icons/fi'
import classNames from 'classnames';

interface ButtonDefaultProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: 'chevronDown';
    variant?: 'active';
    classname?: string;
    color?: 'grey' | 'blue';
}

const ButtonDefault: React.FC<React.PropsWithChildren<ButtonDefaultProps>> = ({
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

export default ButtonDefault