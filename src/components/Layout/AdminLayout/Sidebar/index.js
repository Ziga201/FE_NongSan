import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faUser, faClipboardUser, faBlog, faTruck, faMessage, faTable } from '@fortawesome/free-solid-svg-icons';
import style from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import '~/components/Layout/AdminLayout/Sidebar/Active.css';
const cx = classNames.bind(style);

function Sidebar() {
    return (
        <div className={cx('sidebar', 'admin')}>
            <NavLink to="/admin/product" className={cx('element')}>
                <div className={cx('wrap')}>
                    <div className={cx('logo')}>
                        <FontAwesomeIcon icon={faBox} />
                    </div>
                    <div className={cx('desc')}>Danh mục sản phẩm</div>
                </div>
            </NavLink>
            <NavLink to="/admin/producttype" className={cx('element')}>
                <div className={cx('wrap')}>
                    <div className={cx('logo')}>
                        <FontAwesomeIcon icon={faTable} />
                    </div>
                    <div className={cx('desc')}>Danh mục loại sản phẩm</div>
                </div>
            </NavLink>
            <NavLink to="/admin/checkout" className={cx('element')}>
                <div className={cx('wrap')}>
                    <div className={cx('logo')}>
                        <FontAwesomeIcon icon={faTruck} />
                    </div>
                    <div className={cx('desc')}>Danh mục đơn hàng</div>
                </div>
            </NavLink>
            <NavLink to="/admin/account" className={cx('element')}>
                <div className={cx('wrap')}>
                    <div className={cx('logo')}>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className={cx('desc')}>Danh mục tài khoản</div>
                </div>
            </NavLink>

            <NavLink to="/admin/blog" className={cx('element')}>
                <div className={cx('wrap')}>
                    <div className={cx('logo')}>
                        <FontAwesomeIcon icon={faBlog} />
                    </div>
                    <div className={cx('desc')}>Danh mục bài viết</div>
                </div>
            </NavLink>
            <NavLink to="/admin/message" className={cx('element')}>
                <div className={cx('wrap')}>
                    <div className={cx('logo')}>
                        <FontAwesomeIcon icon={faMessage} />
                    </div>
                    <div className={cx('desc')}>Danh mục lời nhắn</div>
                </div>
            </NavLink>
        </div>
    );
}

export default Sidebar;
