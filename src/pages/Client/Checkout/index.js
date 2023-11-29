import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import style from './Checkout.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import checkoutService from '~/services/checkoutService';
const cx = classNames.bind(style);

function Checkout() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(items);
    }, []);

    const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

    // const totalUSD = parseInt(totalPrice / 23000);

    // ADD

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [confirm, setConfirm] = useState('Thanh toán khi nhận hàng');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        // const cart = JSON.parse(localStorage.getItem('cartItems'));
        const total = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
        const product = cartItems.reduce((acc, item) => acc + `${item.name} x${item.quantity} `, '');
        console.log(product);

        const today = new Date();
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        const orderdate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('total', total);
        formData.append('product', product);
        formData.append('orderdate', orderdate);
        formData.append('confirm', confirm);
        // formData.append('cart', cart);

        const response = await checkoutService.create(formData);
        if (response.data.success === true) {
            setMessage('Đặt đơn hàng thành công');
            window.location.href = '/confirm';
        } else {
            setMessage('Đặt đơn hàng thất bại');
        }

        setTimeout(() => {
            setMessage('');
        }, 2000);

        localStorage.removeItem('cartItems');
        event.target.reset();

        // initModal();
    };

    const handlePaypal = () => {
        setTimeout(() => {
            const button = document.getElementById('submit');
            button.click();
        }, 500);
    };

    return (
        <>
            <div className={cx('checkout')}>
                <div className={cx('row')}>
                    <div className={cx('col-md-7')}>
                        <form onSubmit={handleSubmit} className={cx('form')}>
                            <label for="name" className={cx('label')}>
                                Tên khách hàng:
                            </label>
                            <input
                                className={cx('input-form')}
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                            <label for="phone">Số điện thoại:</label>
                            <input
                                className={cx('input-form')}
                                type="text"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                required
                            />
                            <label for="address">Địa chỉ:</label>
                            <input
                                className={cx('input-form')}
                                type="text"
                                id="address"
                                name="address"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                required
                            />

                            <div className={cx('row checkout')}>
                                <div className={cx('col-md-4')}>
                                    <p>Thanh toán ngay với Paypal</p>
                                </div>
                                <div className={cx('col-md-4')}>
                                    <PayPalScriptProvider
                                        options={{
                                            'client-id':
                                                'AY3o2DhF061U3MnsiFc0V9Q_RjXM-gkS8Y3VQWuGRlVzBd_7AEL7mGlM_WzNoSGxPQ3az2dBa-P1Feco',
                                        }}
                                    >
                                        <PayPalButtons
                                            type="submit"
                                            // onClick={() => handleSubmit()}
                                            style={{
                                                layout: 'horizontal',
                                            }}
                                            createOrder={(data, actions) => {
                                                const totalPrice = cartItems.reduce(
                                                    (acc, item) => acc + Number(item.price) * item.quantity,
                                                    0,
                                                );

                                                const totalUSD = (totalPrice / 23000).toFixed(2);
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                value: totalUSD,
                                                            },
                                                        },
                                                    ],
                                                    application_context: {
                                                        shipping_preference: 'NO_SHIPPING',
                                                    },
                                                });
                                            }}
                                            onApprove={async (data, actions) => {
                                                const details = await actions.order.capture();
                                                const name =
                                                    details.payer.name.given_name + ' ' + details.payer.name.surname;
                                                setConfirm('Đã thanh toán Paypal, chủ thẻ: ' + name);
                                                handlePaypal();

                                                // const details = await actions.order.capture();
                                                // const name = details.payer.name.given_name;
                                                // alert('Transaction completed by ' + name);
                                            }}
                                            // onApprove={(data, actions) => {
                                            //     return actions.order.capture().then((details) => {
                                            //         alert('Transaction completed by ' + details.payer.name.given_name);
                                            //     });
                                            // }}
                                        />
                                    </PayPalScriptProvider>
                                    <input
                                        id="submit"
                                        className={cx('input-btn')}
                                        type="submit"
                                        value="Thanh toán khi nhận hàng"
                                    />
                                </div>
                                <div className={cx('col-md-4')}></div>
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

                                <div style={{ 'border-bottom': '1px solid #eee' }}>
                                    {cartItems.map((item, index) => (
                                        <>
                                            <div className={cx('order-product')}>
                                                <div className={cx('')}>
                                                    {item.name} x {item.quantity}{' '}
                                                </div>
                                                <div className={cx('order-heading')}>
                                                    {parseInt(item.price).toLocaleString('vi-VN')}
                                                </div>
                                            </div>
                                        </>
                                    ))}
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
