import style from './Header.module.scss';
import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind';
import logo from '~/assets/images/logo.svg';
import { NavLink, Link } from 'react-router-dom';
import { faCartShopping, faSignOut, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import checkoutService from '~/services/checkoutService';

const cx = classNames.bind(style);

function Header() {
    // const [cartCount, setCartCount] = useState(0);

    // useEffect(() => {
    //     const items = JSON.parse(localStorage.getItem('cartItems'));
    //     setCartCount(items.length);
    // }, [cartCount]);

    // Quantity cart
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems'));
        setCartItems(items);
        setCartCount(items ? items.length : 0);
    }, [cartItems]);

    // Active navlink
    const [activeNav, setActiveNav] = useState('');

    const handleNavClick = (nav) => {
        setActiveNav(nav);
    };

    return (
        <header className={cx('header-wrap')}>
            <div className={cx('ship')}>
                <div className={cx('wrapper')}>
                    <div className={cx('ship-text')}>Chuyển phát nhanh quốc tế MIỄN PHÍ + trả hàng DỄ DÀNG</div>
                    <div className={cx('')}></div>
                </div>
            </div>
            <div className={cx('header')}>
                <div className={cx('wrapper')}>
                    <div className={cx('logo')}>
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div className={cx('menu')}>
                        <NavLink
                            className={cx('menu-link', `${activeNav === '' ? 'active' : ''}`)}
                            onClick={() => handleNavClick('')}
                            to="/"
                        >
                            <div className={cx('title')}>Trang chủ</div>
                        </NavLink>

                        <NavLink
                            className={cx('menu-link', `${activeNav === 'sanpham' ? 'active' : ''}`)}
                            onClick={() => handleNavClick('sanpham')}
                            to="/product"
                        >
                            <div className={cx('title')}>Sản phẩm</div>
                        </NavLink>
                        <NavLink
                            className={cx('menu-link', `${activeNav === 'doingu' ? 'active' : ''}`)}
                            onClick={() => handleNavClick('doingu')}
                            to="/staff"
                        >
                            <div className={cx('title')}>Đội ngũ</div>
                        </NavLink>
                        <NavLink
                            className={cx('menu-link', `${activeNav === 'tintuc' ? 'active' : ''}`)}
                            onClick={() => handleNavClick('tintuc')}
                            to="/blog"
                        >
                            <div className={cx('title')}>Tin tức</div>
                        </NavLink>
                        <NavLink
                            className={cx('menu-link', `${activeNav === 'lienhe' ? 'active' : ''}`)}
                            onClick={() => handleNavClick('lienhe')}
                            to="/contact"
                        >
                            <div className={cx('title')}>Liên hệ</div>
                        </NavLink>
                    </div>
                    <div className={cx('action')}>
                        <div>
                            <div className={cx('search')}>
                                <FontAwesomeIcon icon={faSignOut} />
                            </div>
                        </div>
                        <Link to="/account">
                            <div className={cx('user')}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        </Link>
                        <Link className={cx()} to="/order">
                            <div className={cx('wrap')}>
                                <div className={cx('heart')}>
                                    <FontAwesomeIcon icon={faTruck} />
                                </div>
                                {/* <span className={cx('count')}>{orderQuantity}</span> */}
                            </div>
                        </Link>
                        <Link to="/cart" className={cx('link-cart')}>
                            <div className={cx('wrap')}>
                                <div className={cx('cart')}>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </div>
                                <span className={cx('count')}>{cartCount}</span>
                            </div>

                            {/* <span className={cx('total')}>{totalPrice} VND</span> */}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
