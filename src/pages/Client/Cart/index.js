import { useEffect, useState } from 'react';
import style from './Cart.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import cartService from '~/services/cartService';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(style);

function Cart() {
    const [cart, setCart] = useState([]);
    const [update, setUpdate] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken');
    const jwt = jwtDecode(jwtToken);
    const navigate = useNavigate();

    console.log(jwt);

    useEffect(() => {
        const fetchData = async () => {
            const response = await cartService.getAll(jwt.Id);
            setCart(response);
        };
        fetchData();
    }, [update]);

    const deleteItem = async (cartItemID) => {
        const response = await cartService.delete(cartItemID);
        toast.success('Xóa sản phẩm khỏi giỏ hàng');
        setUpdate(new Date());
    };
    const totalPrice =
        cart.length == 0 || cart.data == ''
            ? 0
            : cart.data.reduce((acc, item) => acc + item.discountedPrice * item.quantity, 0);

    const handleSubmit = () => {
        if (cart.data == '') toast.error('Chưa có sản phẩm trong giỏ hàng !');
        else {
            navigate('/checkout');
        }
    };

    const handleQuantity = async (number, productID) => {
        const formData = new FormData();

        formData.append('number', number);
        formData.append('accountID', jwt.Id);
        formData.append('productID', productID);

        const response = await cartService.handleQuantity(formData);
        setUpdate(new Date());
    };
    return (
        <>
            <ToastContainer position="bottom-right" />
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
                                    <td className={cx('td')} style={{ fontWeight: '500' }}>
                                        <Link to={'/product/' + item.productID}>{item.nameProduct}</Link>
                                    </td>

                                    <td to={'/product/' + item.productID} className={cx('td')}>
                                        <Link to={'/product/' + item.productID}>
                                            <img
                                                style={{ width: '100px' }}
                                                src={item.avatarImageProduct}
                                                alt="product"
                                            />
                                        </Link>
                                    </td>

                                    <td className={cx('td')}>
                                        <span className={cx('original-price')}>
                                            {parseInt(item.price).toLocaleString('vi-VN')}
                                        </span>
                                        <span>{parseInt(item.discountedPrice).toLocaleString('vi-VN')}</span>
                                    </td>

                                    <td className={cx('td')}>
                                        <span
                                            className={cx('border')}
                                            onClick={() => handleQuantity(0, item.productID)}
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </span>
                                        <span className={cx('border')}>{item.quantity}</span>

                                        <span
                                            className={cx('border')}
                                            onClick={() => handleQuantity(1, item.productID)}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </span>
                                    </td>
                                    <td className={cx('td')}>
                                        {(parseInt(item.discountedPrice) * item.quantity).toLocaleString('vi-VN')}
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
