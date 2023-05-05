import React from 'react'
import s from './index.module.scss'
import Button from '../Button'
import { FiChevronDown } from 'react-icons/fi'
import classNames from 'classnames';

interface DropdownButtonProps {
}

const DropdownButton: React.FC<React.PropsWithChildren<DropdownButtonProps>> = ({
    children,
}) => {

    return (
        <Button classname={classNames(s.openButton)}>
            {children}
            <FiChevronDown className={s.image} />
        </Button>
    )
}

export default DropdownButton