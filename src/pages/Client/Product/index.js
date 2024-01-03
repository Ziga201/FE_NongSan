import style from './Product.module.scss';
import React, { useState, useEffect } from 'react';
import productService from '~/services/productService';
import productTypeService from '~/services/productTypeService';
import cartService from '~/services/cartService';
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAnglesRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function Product() {
    const [data, setData] = useState({});
    const [pageNumber, setPageNumber] = useState({
        pageNumber: 1,
        pageSize: 99,
    });
    const [typeData, setTypeData] = useState([]);
    const [key, setKey] = useState('');
    const [search, setSearch] = useState('');

    const [account, setAccount] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const jwtToken = localStorage.getItem('jwtToken');
            if (jwtToken) {
                try {
                    // 2. Sử dụng try-catch cho jwtDecode
                    const response = await jwtDecode(jwtToken);
                    if (response) {
                        setAccount(response);
                    }
                } catch (error) {
                    console.error('Error decoding JWT:', error);
                }
            }
        };

        fetch();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await productService.getAll(pageNumber.pageSize, pageNumber.pageNumber);

            setData(response.data);
        };
        fetchData();
    }, []);

    // Add to cart
    useEffect(() => {
        const fetchData = async () => {
            const response = await productTypeService.getAll();
            setTypeData(response);
        };
        fetchData();
    }, []);

    function handleFilter(item) {
        setKey(item);
    }
    function handleClick(id) {}

    // Search item

    const addToCart = async (item) => {
        const formData = new FormData();

        formData.append('accountID', account.Id);
        formData.append('productID', item);

        const response = await cartService.addToCart(formData);
        toast.success(response.data.message);
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

                                {typeData.data !== undefined && (
                                    <div>
                                        {typeData.data.map((item) => (
                                            <div
                                                className={cx('item')}
                                                onClick={() => handleFilter(`${item.productTypeID}`)}
                                            >
                                                <FontAwesomeIcon icon={faAngleRight} className={cx('item-icon')} />
                                                <div className={cx('item-text')}>{item.nameProductType}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={cx('col-md-10')}>
                            {data.data !== undefined && (
                                <div className={cx('row')}>
                                    {data.data
                                        .filter((item) => {
                                            return key === '' ? item : item.productTypeID == key;
                                        })
                                        .filter((item) => {
                                            return search.toLowerCase() === ''
                                                ? item
                                                : item.nameProduct.toLowerCase().includes(search.toLowerCase());
                                        })
                                        .map((item) => (
                                            <div key={item.productID} className={cx('product-block', 'col-md-3')}>
                                                <div onClick={() => handleClick(item.productID)}>
                                                    <div className={cx('product-img')}>
                                                        <img src={item.avatarImageProduct} alt="product" />
                                                    </div>
                                                    <div className={cx('product-name')}>{item.nameProduct}</div>
                                                </div>

                                                <div className={cx('product-price')}>
                                                    {parseInt(item.price).toLocaleString('vi-VN')} VND
                                                </div>
                                                <button
                                                    onClick={() => addToCart(item.productID)}
                                                    className={cx('product-add')}
                                                >
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
