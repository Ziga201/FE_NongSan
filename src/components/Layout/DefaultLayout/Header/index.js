import style from './Header.module.scss';
import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind';
import logo from '~/assets/images/logo.svg';
import { NavLink, Link } from 'react-router-dom';
import { faCartShopping, faMailBulk, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cartService from '~/services/cartService';
import { jwtDecode } from 'jwt-decode';
const cx = classNames.bind(style);

function Header() {
    // const [cart, setCart] = useState([]);
    // const [update, setUpdate] = useState(1);
    // const [cartTotal, setCartTotal] = useState(0);

    const jwtToken = localStorage.getItem('jwtToken');

    const handleLogin = () => {
        if (jwtToken != null) {
            window.location.href = '/account';
        } else {
            window.location.href = '/login';
        }
    };
    // const jwt = jwtDecode(jwtToken);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await cartService.getAll(jwt.Id);
    //         setCart(response);
    //     };
    //     fetchData();
    // }, []);

    // useEffect(() => {
    //     cart.data !== undefined && cart.data.length > 0 && setCartTotal(cart.data.length);
    //     setUpdate(new Date());
    // }, [update]);
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
                        <NavLink className={cx('menu-link')} to="/">
                            <div className={cx('title')}>Trang chủ</div>
                        </NavLink>

                        <NavLink className={cx('menu-link')} to="/product">
                            <div className={cx('title')}>Sản phẩm</div>
                        </NavLink>
                        <NavLink className={cx('menu-link')} to="/staff">
                            <div className={cx('title')}>Đội ngũ</div>
                        </NavLink>
                        <NavLink className={cx('menu-link')} to="/blog">
                            <div className={cx('title')}>Tin tức</div>
                        </NavLink>
                        <NavLink className={cx('menu-link')} to="/contact">
                            <div className={cx('title')}>Liên hệ</div>
                        </NavLink>
                    </div>
                    <div className={cx('action')}>
                        <div>
                            <div className={cx('search')}>
                                <FontAwesomeIcon icon={faMailBulk} />
                            </div>
                        </div>
                        <Link onClick={() => handleLogin()}>
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
                                {/* <span className={cx('count')}>{cartTotal}</span> */}
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
