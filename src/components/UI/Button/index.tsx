import classNames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react'

import s from './index.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    classname?: string;
}

const Button: React.FunctionComponent<ButtonProps> = ({ children, classname, ...props }) => {
    return (
        <button className={classNames(classname, s.button)} {...props}>
            {children}
        </button>
    );
};

export default Button;