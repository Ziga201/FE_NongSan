import style from './Product.module.scss';
import React, { useState, useEffect } from 'react';
import productService from '~/services/productService';

import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAnglesRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import ProductDetail from '../ProductDetail';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function Product() {
    const [data, setData] = useState({});
    const [pageNumber, setPageNumber] = useState({
        pageNumber: 1,
        pageSize: 99,
    });
    useEffect(() => {
        const fetchData = async () => {
            const response = await productService.getAll(pageNumber.pageSize, pageNumber.pageNumber);

            setData(response.data);
        };
        fetchData();
    }, []);
    console.log(data.data);

    // Add to cart
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems'));
        if (items) {
            setCartItems(items);
        }
    }, []);

    const user = JSON.parse(localStorage.getItem('user'));

    function addToCart(item) {
        if (user) {
            toast.success('Thêm vào giỏ hàng thành công !');
            const product = {
                productID: item.productID,
                nameProduct: item.nameProduct,
                avartarImageProduct: item.avartarImageProduct,
                price: item.price,
                quantity: 1,
            };
            const itemIndex = cartItems.findIndex((i) => i.id === item.productID);
            console.log(itemIndex);
            if (itemIndex >= 0) {
                const newCartItems = [...cartItems];
                newCartItems[itemIndex].quantity++;
                setCartItems(newCartItems);
                localStorage.setItem('cartItems', JSON.stringify(newCartItems));
            } else {
                // const newCartItem = { ...cartItems, quantity: 1 };
                // product.quantity++;
                const newCartItems = [...cartItems, product];
                setCartItems(newCartItems);
                localStorage.setItem('cartItems', JSON.stringify(newCartItems));
            }
        } else {
            window.location.href = '/login';
        }
    }

    // Search item
    const [search, setSearch] = useState('');
    // console.log(search);
    const [key, setKey] = useState('');
    const handleFilter = (key) => {
        setKey(key);
    };

    // Chuyen huong product detail

    const handleClick = (productId) => {
        // <Navigate to={`/product/${productId}`} />;
        window.location.href = `/product/${productId}`;
    };

    return (
        <>
            <div className={cx('banner')}>
                <div className={cx('wrapper')}>
                    <div className={cx('heading')}>Sản phẩm</div>
                    <div className={cx('path')}>
                        <Link to="/" className={cx('link')}>
                            Trang chủ
                        </Link>
                        <FontAwesomeIcon style={{ margin: '0 5px' }} icon={faAngleRight} />
                        <span className={cx('page')}>Sản phẩm</span>
                    </div>
                </div>
            </div>

            <div className={cx('content')}>
                <div className={cx('wrapper')}>
                    <div className={cx('text-editor')}>Discover</div>

                    <div className={cx('search')}>
                        <input
                            type="text"
                            className={cx('search-input')}
                            placeholder="Nhập tên sản phẩm..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                    </div>

                    <div className={cx('row')}>
                        <div className={cx('col-md-2')}>
                            <div className={cx('categories')}>
                                <div className={cx('title')}>Danh mục</div>

                                <div className={cx('item')} onClick={() => handleFilter('')}>
                                    <FontAwesomeIcon icon={faAngleRight} className={cx('item-icon')} />
                                    <div className={cx('item-text')}>Tất cả</div>
                                </div>
                                <div className={cx('item')} onClick={() => handleFilter('Trái cây & rau củ')}>
                                    <FontAwesomeIcon icon={faAngleRight} className={cx('item-icon')} />
                                    <div className={cx('item-text')}>Trái cây & Rau củ </div>
                                </div>
                                <div className={cx('item')} onClick={() => handleFilter('Sản phẩm đóng gói')}>
                                    <FontAwesomeIcon icon={faAngleRight} className={cx('item-icon')} />
                                    <div className={cx('item-text')}>Sản phẩm đóng gói</div>
                                </div>
                                <div className={cx('item')} onClick={() => handleFilter('Sản phẩm chế biến')}>
                                    <FontAwesomeIcon icon={faAngleRight} className={cx('item-icon')} />
                                    <div className={cx('item-text')}>Sản phẩm chế biến</div>
                                </div>
                                <div className={cx('item')} onClick={() => handleFilter('Hạt giống & cây trồng')}>
                                    <FontAwesomeIcon icon={faAngleRight} className={cx('item-icon')} />
                                    <div className={cx('item-text')}>Hạt giống & cây trồng</div>
                                </div>
                                <div className={cx('item')} onClick={() => handleFilter('Chưa được phân loại')}>
                                    <FontAwesomeIcon icon={faAngleRight} className={cx('item-icon')} />
                                    <div className={cx('item-text')}>Chưa được phân loại</div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-md-10')}>
                            {data.data !== undefined && (
                                <div className={cx('row')}>
                                    {data.data
                                        // .filter((item) => {
                                        //     return key.toLowerCase() === ''
                                        //         ? item
                                        //         : item.category.toLowerCase().includes(key.toLowerCase());
                                        // })
                                        // .filter((item) => {
                                        //     return search.toLowerCase() === ''
                                        //         ? item
                                        //         : item.nameProduct.toLowerCase().includes(search.toLowerCase());
                                        // })
                                        .map((item) => (
                                            <div key={item.productID} className={cx('product-block', 'col-md-3')}>
                                                <div onClick={() => handleClick(item.productID)}>
                                                    <div className={cx('product-img')}>
                                                        <img src={item.avartarImageProduct} alt="product" />
                                                    </div>
                                                    <div className={cx('product-name')}>{item.nameProduct}</div>
                                                </div>

                                                <div className={cx('product-price')}>
                                                    {parseInt(item.price).toLocaleString('vi-VN')} VND
                                                </div>
                                                <button onClick={() => addToCart(item)} className={cx('product-add')}>
                                                    Thêm giỏ hàng
                                                    <FontAwesomeIcon className={cx('add-icon')} icon={faAnglesRight} />
                                                </button>
                                                <ToastContainer position="bottom-right" />
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;
