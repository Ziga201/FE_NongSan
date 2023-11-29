import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faSignOut } from '@fortawesome/free-solid-svg-icons';
import style from './Header.module.scss';
import avatar from './img/avatar.jpg';
import logo from './img/logo.svg';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function Header() {
    const signOut = () => {
        localStorage.removeItem('admin');
        window.location.href = '/login';
    };
    return (
        <header className={cx('header')}>
            <Link to="/admin" className={cx('logo')}>
                <img src={logo} />
            </Link>
            <div className={cx('info')}>
                <div className={cx('function')}>
                    <div className={cx('element')}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </div>
                <div className={cx('notify')}>
                    <div className={cx('element')}>
                        <FontAwesomeIcon icon={faBell} />
                    </div>
                    <div onClick={() => signOut()} className={cx('element')} title="Đăng xuất">
                        <FontAwesomeIcon icon={faSignOut} />
                    </div>
                    <div className={cx('element')}>
                        <img src={avatar} width="35px" />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
