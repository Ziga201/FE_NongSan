import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import style from '~/pages/Client/Order/Order.module.scss';
// import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useState, useEffect } from 'react';
import checkoutService from '~/services/checkoutService';

const cx = classNames.bind(style);

function Order() {
    const [checkouts, setCheckouts] = useState({});

    const fetchCheckouts = async () => {
        setCheckouts(await checkoutService.getCheckouts());
    };

    useEffect(() => {
        fetchCheckouts();
    }, []);

    const deleteCheckout = async (id, e) => {
        const confirm = window.confirm('Bạn có muốn huỷ đơn hàng không');
        if (confirm) {
            var response = await checkoutService.deleteCheckout(id);
            if (response.data.success === true) {
                alert('Huỷ đơn hàng thành công');
                document.getElementById(id).parentElement.parentElement.remove();
            } else {
                alert(response.data.msg);
            }
        }
    };

    return (
        <>
            <div className={cx('hug')}>
                {checkouts.data !== undefined && checkouts.data.data.length > 0 && (
                    <div className={cx('wrapper')}>
                        <div className={cx('heading')}>
                            <div className="col">
                                <div className={cx('name_table')}>Đơn đặt hàng</div>
                            </div>
                        </div>
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
                                {checkouts.data.data.map((checkout, index) => (
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
                                                Huỷ đơn hàng
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

export default Order;
