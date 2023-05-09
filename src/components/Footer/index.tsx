import React from 'react';
import s from './index.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { HOMEPAGE_ROUTE } from '../../constants/routes';

interface FooterProps { }

const Footer: React.FunctionComponent<FooterProps> = () => {
    const items = [
        {
            href: HOMEPAGE_ROUTE,
            text: 'Главная'
        },
    ];

    return (
        <footer className={s.footer}>
            <div className={classNames('container', s.container)}>
                <ul className={s.list}>
                    {items.map((el) => {
                        return (
                            <li key={el.text} className={s.item}>
                                <Link to={el.href} className={s.link}>
                                    {el.text}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <span className={s.author}>by @cloud-art</span>
            </div>
        </footer>
    );
};

export default Footer;
