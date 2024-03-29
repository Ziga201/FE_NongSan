import 'bootstrap/dist/css/bootstrap.css';
import style from '~/pages/Client/Order/Order.module.scss';
import classNames from 'classnames/bind';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import orderService from '~/services/orderService';
import productService from '~/services/productService';
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EvaluateComponent from './Evaluate/EvaluateComponent';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

function Order() {
    const [order, setOrder] = useState([]);
    const [review, setReview] = useState([]);

    const [update, setUpdate] = useState();
    const [listProductID, setListProductID] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken');
    const responseJWT = jwtDecode(jwtToken);
    useEffect(() => {
        const fetchData = async () => {
            const response = await orderService.getAllOrderByID(responseJWT.Id);
            setOrder(response);
        };
        fetchData();
    }, [update]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await productService.getProductReviewByAccountID(responseJWT.Id);
            setReview(response);
        };
        fetchData();
    }, [update]);

    useEffect(() => {
        const fetchData = async () => {
            const newListProductID = review.data !== undefined ? review.data.map((x) => x.productID) : [];
            setListProductID(newListProductID);
        };
        fetchData();
    }, [review]);

    const isProductIDExist = (productID) => {
        return listProductID.includes(productID);
    };

    const formatDate = (date) => {
        const dateObject = new Date(date);

        const formattedDate = format(dateObject, 'HH:mm dd-MM-yyyy');
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
            <ToastContainer position="bottom-right" />
            {order.data !== undefined && order.data.length > 0 && (
                <div>
                    {order.data.map((item) => (
                        <div className={cx('order-details')}>
                            {item.orderDetailDTOs.map((itemDetail) => (
                                <div className={cx('order-details-info')}>
                                    <Link
                                        to={`/product/${itemDetail.productID}`}
                                        className={cx('product', 'col-md-10')}
                                    >
                                        <img src={itemDetail.avatarImageProduct} alt="Product Image" />
                                        <div className={cx('product-info')}>
                                            <div>{itemDetail.nameProduct}</div>
                                            <span>x{itemDetail.quantity}</span>
                                            <div>Giá: {itemDetail.priceTotal}</div>
                                        </div>
                                    </Link>
                                    <div className={cx('evaluate', 'col-md-2')}>
                                        {item.orderStatusID != 3 && (
                                            <button className="btn btn-secondary" disabled>
                                                Chờ đánh giá
                                            </button>
                                        )}
                                        {item.orderStatusID === 3 && !isProductIDExist(itemDetail.productID) && (
                                            <EvaluateComponent
                                                productID={itemDetail.productID}
                                                accountID={responseJWT.Id}
                                                setUpdate={setUpdate}
                                            />
                                        )}
                                        {item.orderStatusID === 3 && isProductIDExist(itemDetail.productID) && (
                                            <button className="btn btn-success" disabled>
                                                Đã đánh giá
                                            </button>
                                        )}

                                        <ToastContainer position="bottom-right" />
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
                                    <p>{item.totalPrice.toLocaleString('vi-VN')} VND</p>
                                </div>
                            </div>
                            <div className={cx('cancel')}>
                                {item.orderStatusID == 1 && (
                                    <button className={cx('btn btn-danger')} onClick={() => cancelOrder(item.orderID)}>
                                        Hủy Đơn Hàng
                                    </button>
                                )}
                                {item.orderStatusID == 2 && (
                                    <button
                                        className={cx('btn btn-secondary')}
                                        disabled
                                        onClick={() => cancelOrder(item.orderID)}
                                    >
                                        Hủy Đơn Hàng
                                    </button>
                                )}
                                {item.orderStatusID == 3 && (
                                    <button className={cx('btn btn-primary')} disabled>
                                        Hoàn thành đơn hàng
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Order;
