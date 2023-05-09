import React from 'react'
import { Link } from 'react-router-dom';
import logoImage from '../../../assets/logo.svg'
import s from './index.module.scss'
import { HOMEPAGE_ROUTE } from '../../../constants/routes';

interface LogoProps {
    classname?: string;
}

const Logo: React.FC<LogoProps> = ({ classname }) => {
    return (
        <Link to={HOMEPAGE_ROUTE} className={s.logo}>
            <img src={logoImage} alt="Movieton" />
        </Link>
    )
}

export default Logo