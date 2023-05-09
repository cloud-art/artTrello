import React from 'react'
import s from './index.module.scss'

interface ItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    text: string;
}

const Item: React.FC<ItemProps> = ({ text, ...props }) => {
    return (
        <div className={s.itemWrapper}>
            <div className={s.item} {...props}>{text}</div>
        </div>
    )
}

export default Item