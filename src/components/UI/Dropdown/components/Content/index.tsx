import React from 'react'
import s from './index.module.scss'
import classNames from 'classnames'

interface ContentProps {
    isOpen: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const Content: React.FC<React.PropsWithChildren<ContentProps>> = ({
    children,
    isOpen,
    className,
    style,
}) => {
    return (
        <div className={classNames(s.dropdown, isOpen && s.dropdownOpen, className)} style={style}>
            {children}
        </div>
    )
}

export default Content