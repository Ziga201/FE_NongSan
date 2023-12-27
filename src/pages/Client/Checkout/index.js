import style from './Checkout.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import cartService from '~/services/cartService';
import userService from '~/services/userService';
import orderService from '~/services/orderService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cx = classNames.bind(style);

function Checkout() {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState([]);
    const [paymentType, setPaymentType] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await userService.getByID(2);
            setUser(response.data.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (user) {
            setFullName(user.userName);
            setEmail(user.email);
            setPhone(user.phone);
            setAddress(user.address);
        }
    }, [user]);

    const [userID] = useState(2);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [paymentID, setPaymentID] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const response = await cartService.getAll(2);
            setCart(response);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await orderService.getAllPayment();
            setPaymentType(response);
        };
        fetchData();
    }, []);
    console.log(cart);
    const totalPrice = cart.length == 0 ? 0 : cart.data.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // ADD

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const formData = new FormData();

        // formData.append('userID', userID);
        // formData.append('fullName', fullName);
        // formData.append('email', email);
        // formData.append('phone', phone);
        // formData.append('address', address);
        // formData.append('paymentID', paymentID);
        const order = {
            PaymentID: paymentID,
            UserID: userID,
            FullName: fullName,
            Email: email,
            Phone: phone,
            Address: address,
        };

        /////////
        const orderDetail = [];
        if (cart.data) {
            const selectedData = cart.data.map((item) => ({
                productID: item.productID,
                quantity: item.quantity,
            }));

            orderDetail.push(...selectedData);
        }

        console.log(order);
        console.log(orderDetail);
        toast.success('Đang đặt hàng !');

        const response = await orderService.order(order, orderDetail);

        const deleteCart = await cartService.deleteCart(2);

        window.location.href = response.data.message;

        // alert(response.data.message);

        event.target.reset();
    };

    return (
        <>
            <div className={cx('checkout')}>
                <div className={cx('row')}>
                    <div className={cx('col-md-7')}>
                        <form onSubmit={handleSubmit} className={cx('form')}>
                            <label className={cx('label')}>Tên khách hàng:</label>
                            <input
                                className={cx('input-form')}
                                type="text"
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                                required
                            />
                            <label>Email:</label>
                            <input
                                className={cx('input-form')}
                                type="text"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                            <label>Số điện thoại:</label>
                            <input
                                className={cx('input-form')}
                                type="text"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                required
                            />
                            <label>Địa chỉ:</label>
                            <input
                                className={cx('input-form')}
                                type="text"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                required
                            />

                            {paymentType.data !== undefined && paymentType.data.length > 0 && (
                                <select
                                    value={paymentID}
                                    style={{ padding: '9.7px' }}
                                    className={cx('input-form')}
                                    onChange={(event) => setPaymentID(event.target.value)}
                                >
                                    {paymentType.data.map((item) => (
                                        <option key={item.paymentID} value={item.paymentID}>
                                            {item.paymentMethod}
                                        </option>
                                    ))}
                                </select>
                            )}

                            <div className={cx('')}>
                                <input id="submit" className={cx('input-btn')} type="submit" value="Đặt hàng" />
                                <ToastContainer position="bottom-right" />
                            </div>
                        </form>
                    </div>
                    <div className={cx('col-md-5')}>
                        <div className={cx('order')}>
                            <div className={cx('order-info')}>
                                <div className={cx('order-title')}>
                                    <div className={cx('order-heading')}>Sản phẩm</div>
                                    <div className={cx('order-heading')}>Số tiền</div>
                                </div>

                                <div>
                                    {cart.data !== undefined && cart.data.length > 0 && (
                                        <>
                                            {cart.data.map((item, index) => (
                                                <div key={item.cartItemID} className={cx('order-product')}>
                                                    <div className={cx('')}>
                                                        {item.nameProduct} x {item.quantity}{' '}
                                                    </div>
                                                    <div className={cx('order-heading')}>
                                                        {item.price.toLocaleString('vi-VN')}
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                                <div className={cx('order-title')}>
                                    <div className={cx('order-heading')}>Tổng</div>
                                    <div className={cx('order-money')}>{totalPrice.toLocaleString('vi-VN')} VND</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;
