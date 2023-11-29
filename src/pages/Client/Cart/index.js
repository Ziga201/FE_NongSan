import { useEffect, useState } from 'react';
import style from './Cart.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function Cart() {
    // const [cartItems, setCartItems] = useState([]);

    const [cartItems, setCartItems] = useState(() => {
        const cartData = JSON.parse(localStorage.getItem('cartItems'));
        return cartData ? cartData : [];
    });

    // useEffect(() => {
    //     const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    //     setCartItems(items);
    // }, []);

    function deleteItem(itemId) {
        // const data = JSON.parse(localStorage.getItem(key));
        const newData = cartItems.filter((item) => item.id !== itemId);
        setCartItems(newData);
        localStorage.setItem('cartItems', JSON.stringify(newData));
        console.log(newData);
    }

    // const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + parseInt(item.price) * item.quantity, 0);
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
                    <tbody className={cx('tbody')}>
                        {cartItems.map((item, index) => (
                            <tr className={cx('tr')} key={index}>
                                <td className={cx('td')}>{item.name}</td>
                                <td className={cx('td')}>
                                    <img
                                        style={{ width: '100px' }}
                                        src={'http://localhost:8000/api/postImages/' + item.image}
                                        alt="product"
                                    />
                                </td>
                                <td className={cx('td')}>{parseInt(item.price).toLocaleString('vi-VN')}</td>
                                <td className={cx('td')}>{item.quantity}</td>
                                <td className={cx('td')}>
                                    {(parseInt(item.price) * item.quantity).toLocaleString('vi-VN')}
                                </td>

                                <td className={cx('td')}>
                                    <button className={cx('btn btn-danger')} onClick={() => deleteItem(item.id)}>
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={cx('total')}>
                    <h2 className={cx('total-value')}>Tổng: {totalPrice.toLocaleString('vi-VN')} VND</h2>
                </div>
                <div className={cx('buttons')}>
                    <Link to="/checkout" className={cx('button')}>
                        Thanh toán
                    </Link>
                    <Link to="/" className={cx('button')}>
                        Tiếp tục mua hàng
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Cart;
