import s from './index.module.scss';
import React, { useRef, useState } from 'react';
import useOnClickOutside from 'hooks/useOnClickOutside';
import Content from './components/Content';
import ButtonWrapper from './components/ButtonWrapper';

interface DropdownProps {
    classname?: string;
    width?: string;
    buttonContent?: React.ReactNode;
}

const Dropdown: React.FC<React.PropsWithChildren<DropdownProps>> = ({ children, classname, width = 304, buttonContent }) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const dropdownRef = useRef(null);
    useOnClickOutside(dropdownRef, () => setOpen(false));
    return (
        <div className={s.dropdownWrapper} ref={dropdownRef}>
            <ButtonWrapper isOpen={isOpen} setOpen={setOpen}>
                {buttonContent}
            </ButtonWrapper>
            <Content isOpen={isOpen} className={classname} style={{ width: `${width}px` }}>
                {children}
            </Content>
        </div>

    );
};

export default Dropdown;
