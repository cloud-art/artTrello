import React, { useEffect, useInsertionEffect, useRef, useState } from 'react'
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
    const [gluedRight, setGluedRight] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const offsetWidth = dropdownRef.current?.offsetWidth || 0
        const leftPosition = dropdownRef.current?.getBoundingClientRect().left || 0
        const documentWidth = document.documentElement.scrollWidth
        if (offsetWidth + leftPosition > documentWidth) {
            setGluedRight(true)
        }
    }, [])

    return (
        <div className={classNames(s.dropdown, isOpen && s.dropdownOpen, className, gluedRight && s.dropdownRight)} style={style} ref={dropdownRef}>
            {children}
        </div>
    )
}

export default Content