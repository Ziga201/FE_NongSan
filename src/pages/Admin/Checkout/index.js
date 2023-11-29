import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import style from '~/pages/Admin/Page.module.scss';
// import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';
import checkoutService from '~/services/checkoutService';

const cx = classNames.bind(style);

function Checkout() {
    const [checkouts, setCheckouts] = useState({});

    const fetchCheckouts = async () => {
        setCheckouts(await checkoutService.getCheckouts());
    };

    useEffect(() => {
        fetchCheckouts();
    }, []);

    const deleteCheckout = async (id, e) => {
        var response = await checkoutService.deleteCheckout(id);
        if (response.data.success === true) {
            alert('Xoá thành công');
            document.getElementById(id).parentElement.parentElement.remove();
        } else {
            alert(response.data.msg);
        }
    };
    // Search item
    const [search, setSearch] = useState('');

    return (
        <div className={cx('hug')}>
            <div className={cx('heading')}>
                <div className="col">
                    <div className={cx('name_table')}>Danh mục đơn đặt hàng</div>
                </div>
            </div>
            <div className={cx('search')}>
                <input
                    type="text"
                    className={cx('search-input')}
                    placeholder="Nhập tên khách hàng ..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
            </div>

            {checkouts.data !== undefined && checkouts.data.data.length > 0 && (
                <div className={cx('wrapper')}>
                    <table className="table" style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Sản phẩm</th>
                                <th>Tên khách hàng</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Tổng</th>
                                <th>Ngày đặt hàng</th>
                                <th>Tình trạng</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {checkouts.data.data
                                .filter((checkout) => {
                                    return search.toLowerCase() === ''
                                        ? checkout
                                        : checkout.name.toLowerCase().includes(search.toLowerCase());
                                })
                                .map((checkout, index) => (
                                    <tr>
                                        <td>{index}</td>
                                        <td>{checkout.product}</td>
                                        <td>{checkout.name}</td>

                                        <td>{checkout.phone}</td>
                                        <td>{checkout.address}</td>
                                        <td>{parseInt(checkout.total).toLocaleString('vi-VN')} VND</td>
                                        <td>{checkout.orderdate}</td>
                                        <td>{checkout.confirm}</td>

                                        <td>
                                            <button
                                                style={{ marginLeft: '5px', fontSize: '16px' }}
                                                id={checkout._id}
                                                onClick={(e) => deleteCheckout(checkout._id, e)}
                                                className="btn btn-danger"
                                            >
                                                Xoá
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Checkout;
