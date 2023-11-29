import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faShop, faUser, faClipboardUser, faBlog, faTruck, faMessage } from '@fortawesome/free-solid-svg-icons';
import style from './Sidebar.module.scss';
import { Routes, Route, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(style);

function Sidebar() {
    const [activeNav, setActiveNav] = useState('');

    const handleNavClick = (nav) => {
        setActiveNav(nav);
    };
    return (
        <div className={cx('sidebar')}>
            <Link to="/admin/product" className={cx('element')}>
                <div
                    className={cx('wrap', `${activeNav === 'sp' ? 'active' : ''}`)}
                    onClick={() => handleNavClick('sp')}
                >
                    <div className={cx('logo')}>
                        <FontAwesomeIcon icon={faBox} />
                    </div>
                    <div className={cx('desc')}>Danh mục sản phẩm</div>
                </div>
            </Link>
            <Link to="/admin/checkout" className={cx('element')}>
                <div
                    className={cx('wrap', `${activeNav === 'dh' ? 'active' : ''}`)}
                    onClick={() => handleNavClick('dh')}
                >
                    <div className={cx('logo')}>
                        <FontAwesomeIcon icon={faTruck} />
                    </div>
                    <div className={cx('desc')}>Danh mục đơn hàng</div>
                </div>
            </Link>
            <Link to="/admin/account" className={cx('element')}>
                <div
                    className={cx('wrap', `${activeNav === 'tk' ? 'active' : ''}`)}
                    onClick={() => handleNavClick('tk')}
                >
                    <div className={cx('logo')}>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className={cx('desc')}>Danh mục tài khoản</div>
                </div>
            </Link>
            <Link to="/admin/staff" className={cx('element')}>
                <div
                    className={cx('wrap', `${activeNav === 'nv' ? 'active' : ''}`)}
                    onClick={() => handleNavClick('nv')}
                >
                    <div className={cx('logo')}>
                        <FontAwesomeIcon icon={faClipboardUser} />
                    </div>
                    <div className={cx('desc')}>Danh mục nhân viên</div>
                </div>
            </Link>
            <Link to="/admin/blog" className={cx('element')}>
                <div
                    className={cx('wrap', `${activeNav === 'bv' ? 'active' : ''}`)}
                    onClick={() => handleNavClick('bv')}
                >
                    <div className={cx('logo')}>
                        <FontAwesomeIcon icon={faBlog} />
                    </div>
                    <div className={cx('desc')}>Danh mục bài viết</div>
                </div>
            </Link>
            <Link to="/admin/message" className={cx('element')}>
                <div
                    className={cx('wrap', `${activeNav === 'ln' ? 'active' : ''}`)}
                    onClick={() => handleNavClick('ln')}
                >
                    <div className={cx('logo')}>
                        <FontAwesomeIcon icon={faMessage} />
                    </div>
                    <div className={cx('desc')}>Danh mục lời nhắn</div>
                </div>
            </Link>
        </div>
    );
}

export default Sidebar;
