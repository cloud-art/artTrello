import React from 'react'

interface ButtonWrapperProps {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonWrapper: React.FC<React.PropsWithChildren<ButtonWrapperProps>> = ({
    children,
    isOpen,
    setOpen,
}) => {

    const handleOpen = () => {
        setOpen(!isOpen)
    }

    return (
        <div onClick={handleOpen}>
            {children}
        </div>
    )
}

export default ButtonWrapper