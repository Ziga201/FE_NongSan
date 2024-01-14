import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import style from '~/pages/Admin/Page.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import orderService from '~/services/orderService';
import { format } from 'date-fns';
import ListComponent from './List/ListComponent';

const cx = classNames.bind(style);

function Checkout() {
    const [order, setOrder] = useState([]);
    const [update, setUpdate] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const response = await orderService.getAll();
            setOrder(response);
        };
        fetchData();
    }, [update]);

    const formatDate = (date) => {
        const dateObject = new Date(date);

        const formattedDate = format(dateObject, 'HH:mm dd-MM-yyyy');
        return formattedDate;
    };

    const cancelOrder = async (id) => {
        const result = window.confirm('Bạn có chắc chắn muốn hủy đơn hàng?');
        if (result) {
            const response = await orderService.delete(id);
            toast.success(response.data.message);
            setUpdate(new Date());
        } else {
            toast.success('Bạn đã chọn Cancel!');
        }
    };

    const statusChange = async (id) => {
        const response = await orderService.changeOrderStatus(id);
        toast.success(response.data.message);
        setUpdate(new Date());
    };
    // Search item
    const [search, setSearch] = useState('');

    return (
        <div className={cx('hug')}>
            <div className={cx('heading')}>
                <div className={cx('search')}>
                    <input
                        type="text"
                        className={cx('search-input')}
                        placeholder="Nhập tên khách hàng ..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                </div>
            </div>

            {order.data !== undefined && order.data.length > 0 && (
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
                            {order.data
                                .filter((checkout) => {
                                    return search.toLowerCase() === ''
                                        ? checkout
                                        : checkout.fullName.toLowerCase().includes(search.toLowerCase());
                                })
                                .map((checkout, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            <ListComponent orderDetailDTOs={checkout.orderDetailDTOs} />
                                        </td>
                                        <td>{checkout.fullName}</td>

                                        <td>{checkout.phone}</td>
                                        <td>{checkout.address}</td>
                                        <td>{parseInt(checkout.actualPrice).toLocaleString('vi-VN')} VND</td>
                                        <td>{formatDate(checkout.createdAt)}</td>
                                        <td>{checkout.orderName}</td>

                                        <td>
                                            <button
                                                style={{ marginLeft: '5px', fontSize: '16px' }}
                                                onClick={(e) => statusChange(checkout.orderID, e)}
                                                className="btn btn-success"
                                            >
                                                Chuyển
                                            </button>
                                            <button
                                                style={{ marginLeft: '5px', fontSize: '16px' }}
                                                onClick={(e) => cancelOrder(checkout.orderID, e)}
                                                className="btn btn-danger"
                                            >
                                                Xoá
                                            </button>

                                            <ToastContainer position="bottom-right" />
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
