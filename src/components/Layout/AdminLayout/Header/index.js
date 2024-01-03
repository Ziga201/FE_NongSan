import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faSignOut } from '@fortawesome/free-solid-svg-icons';
import style from './Header.module.scss';
import logo from './img/logo.svg';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import accountService from '~/services/accountService';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);

function Header() {
    const signOut = () => {
        window.location.href = '/login';
        localStorage.removeItem('jwtToken');
    };

    const jwtToken = localStorage.getItem('jwtToken');
    const responseJWT = jwtDecode(jwtToken);

    const [data, setData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const response = await accountService.getAccountByID(responseJWT.Id);
            setData(response.data);
        };
        fetchData();
    }, []);

    console.log(data);
    return (
        <header className={cx('header')}>
            <Link to="/" className={cx('logo')}>
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
                        <img src={data.avatar} width="35px" />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
