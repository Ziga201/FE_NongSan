import 'bootstrap/dist/css/bootstrap.css';
import style from '~/pages/Client/Order/Order.module.scss';
import classNames from 'classnames/bind';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import orderService from '~/services/orderService';
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cx = classNames.bind(style);

function Order() {
    const [order, setOrder] = useState([]);
    const [update, setUpdate] = useState();

    const jwtToken = localStorage.getItem('jwtToken');
    const responseJWT = jwtDecode(jwtToken);
    useEffect(() => {
        const fetchData = async () => {
            const response = await orderService.getAllOrderByID(responseJWT.Id);
            setOrder(response);
        };
        fetchData();
    }, [update]);

    const formatDate = (date) => {
        const dateObject = new Date(date);

        const formattedDate = format(dateObject, 'dd-MM-yyyy');
        return formattedDate;
    };
    const cancelOrder = async (id) => {
        const result = window.confirm('Bạn có chắc chắn muốn hủy đơn hàng?');
        if (result) {
            const response = await orderService.delete(id);
            console.log(response);
            toast.success(response.data.message);
            setUpdate(id);
        } else {
            toast.success('Bạn đã chọn Cancel!');
        }
    };

    return (
        <div className={cx('container')}>
            {order.data !== undefined && order.data.length > 0 && (
                <div>
                    {order.data.map((item) => (
                        <div className={cx('order-details')}>
                            {item.orderDetailDTOs.map((itemDetail) => (
                                <div className={cx('product')}>
                                    <img src={itemDetail.avatarImageProduct} alt="Product Image" />
                                    <div className={cx('product-info')}>
                                        <div>{itemDetail.nameProduct}</div>
                                        <span>x{itemDetail.quantity}</span>
                                        <div>Giá: {itemDetail.priceTotal}</div>
                                    </div>
                                </div>
                            ))}
                            <div className={cx('order-status')}>
                                <h3>Trạng Thái Đơn Hàng</h3>
                                <div className={cx('status-item')}>
                                    <span>Trạng thái hiện tại:</span>
                                    <p>{item.orderName}</p>
                                </div>
                                <div className={cx('status-item')}>
                                    <span>Ngày đặt hàng:</span>
                                    <p>{formatDate(item.createdAt)}</p>
                                </div>
                                <div className={cx('status-item')}>
                                    <span>Tổng thanh toán:</span>
                                    <p>{item.actualPrice.toLocaleString('vi-VN')} VND</p>
                                </div>
                            </div>
                            <div className={cx('cancel')}>
                                <button className={cx('cancel-btn')} onClick={() => cancelOrder(item.orderID)}>
                                    Hủy Đơn Hàng
                                </button>
                                <ToastContainer position="bottom-right" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Order;
