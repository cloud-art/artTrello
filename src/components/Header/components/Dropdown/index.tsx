import classNames from 'classnames';
import s from './index.module.scss';
import React, { useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Button from '../../../UI/Button';
import useOnClickOutside from '../../../../hooks/useOnClickOutside';

interface DropdownProps {
    classname?: string;
    title?: string;
}

const Dropdown: React.FC<React.PropsWithChildren<DropdownProps>> = ({ children, classname, title }) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const dropdownRef = useRef(null);
    useOnClickOutside(dropdownRef, () => setOpen(false));

    return (
        <div className={classNames(classname, s.dropdownWrapper)} ref={dropdownRef}>
            <Button onClick={() => setOpen(!isOpen)} classname={classNames(s.openButton, isOpen && s.openButtonOpen)}>
                {/* <div className={s.openButtonContent}> */}
                {title}
                <FiChevronDown />
                {/* </div> */}
            </Button>
            <div className={classNames(s.dropdown, isOpen && s.dropdownOpen)}>
                <div className={classNames(s.list)}>
                    {children}
                </div>
            </div>
        </div>

    );
};

export default Dropdown;
