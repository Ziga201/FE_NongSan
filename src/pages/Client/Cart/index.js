import { useEffect, useState } from 'react';
import style from './Cart.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import cartService from '~/services/cartService';

const cx = classNames.bind(style);

function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await cartService.getAll(2);
            setCart(response);
        };
        fetchData();
    }, []);

    const deleteItem = async (cartItemID) => {
        const response = await cartService.delete(cartItemID);
    };
    console.log(cart);
    const totalPrice =
        cart.length == 0 || cart.data == '' ? 0 : cart.data.reduce((acc, item) => acc + item.price * item.quantity, 0);

    console.log(cart);
    const handleSubmit = () => {
        if (cart.data == '') alert('Chưa có sản phẩm nào trong giỏ hàng !');
        else {
            window.location.href = 'http://localhost:3000/checkout';
        }
    };
    return (
        <>
            <div className={cx('cart')}>
                <h1 className={cx('heading')}>Giỏ hàng</h1>
                <table className={cx('table')}>
                    <thead>
                        <tr className={cx('tr')}>
                            <th className={cx('th')}>Tên sản phẩm</th>
                            <th className={cx('th')}>Ảnh</th>
                            <th className={cx('th')}>Giá</th>
                            <th className={cx('th')}>Số lượng</th>
                            <th className={cx('th')}>Tổng</th>
                            <th className={cx('th')}>Chức năng</th>
                        </tr>
                    </thead>
                    {cart.data !== undefined && cart.data.length > 0 && (
                        <tbody className={cx('tbody')}>
                            {cart.data.map((item, index) => (
                                <tr className={cx('tr')} key={index}>
                                    <td className={cx('td')}>{item.nameProduct}</td>
                                    <td className={cx('td')}>
                                        <img style={{ width: '100px' }} src={item.avartarImageProduct} alt="product" />
                                    </td>
                                    <td className={cx('td')}>{parseInt(item.price).toLocaleString('vi-VN')}</td>
                                    <td className={cx('td')}>{item.quantity}</td>
                                    <td className={cx('td')}>
                                        {(parseInt(item.price) * item.quantity).toLocaleString('vi-VN')}
                                    </td>

                                    <td className={cx('td')}>
                                        <button
                                            className={cx('btn btn-danger')}
                                            onClick={() => deleteItem(item.cartItemID)}
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
                <div className={cx('total')}>
                    <h2 className={cx('total-value')}>Tổng: {totalPrice.toLocaleString('vi-VN')} VND</h2>
                </div>
                <div className={cx('buttons')}>
                    <button onClick={handleSubmit} className={cx('button')}>
                        Thanh toán
                    </button>
                    <Link to="/" className={cx('button')}>
                        Tiếp tục mua hàng
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Cart;
