import style from './Home.module.scss';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind';
import brand1 from '~/assets/images/brand1.svg';
import brand2 from '~/assets/images/brand2.svg';
import brand3 from '~/assets/images/brand3.svg';
import brand4 from '~/assets/images/brand4.svg';
import brand5 from '~/assets/images/brand5.svg';
import brand6 from '~/assets/images/brand6.svg';
import { Link } from 'react-router-dom';
import { faAnglesRight, faArrowRight, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import productService from '~/services/productService';
import productTypeService from '~/services/productTypeService';
import cartService from '~/services/cartService';

import { jwtDecode } from 'jwt-decode';

const cx = classNames.bind(style);

function Home() {
    // console.log(brand);

    const [data, setData] = useState({});
    const [pageNumber, setPageNumber] = useState({
        pageNumber: 1,
        pageSize: 99,
    });
    const [account, setAccount] = useState([]);
    const [typeData, setTypeData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await productService.getAll(pageNumber.pageSize, pageNumber.pageNumber);

            setData(response.data);
        };
        fetchData();
    }, []);

    // Add to cart
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems'));
        if (items) {
            setCartItems(items);
        }
    }, []);

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
            const response = await productTypeService.getAll();
            setTypeData(response);
        };
        fetchData();
    }, []);

    // Filter item
    const [key, setKey] = useState('');
    const handleFilter = (key) => {
        setKey(key);
    };
    const handleClick = (key) => {};

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
                    <div className={cx('hug-banner')}>
                        <div className={cx('logo-banner')}>
                            <img
                                src="https://demo2wpopal.b-cdn.net/freshio/wp-content/uploads/2020/08/rev-slider_h3-shape.png"
                                alt="logo"
                            />
                        </div>
                        <div className={cx('slogan')}>Cung cấp nông sản</div>
                        <div className={cx('highlight')}>Highest Quanlity</div>
                        <Link to="/product">
                            <div className={cx('btn')}>
                                Khám phá sản phẩm
                                <FontAwesomeIcon className={cx('icon')} icon={faArrowRight} />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={cx('service')}>
                <div className={cx('wrapper')}>
                    <div className={cx('list', 'row')}>
                        <div className={cx('item', 'col-md-4')}>
                            <div className={cx('sticker')}>
                                <img
                                    src="https://demo2wpopal.b-cdn.net/freshio/wp-content/uploads/2020/08/1.png"
                                    alt="1"
                                />
                            </div>
                            <div className={cx('title')}>Nông sản xanh sạch</div>
                            <div className={cx('desc')}>
                                Freshio nói không với chất hoá học, đảm bảo an toàn cho sức khoẻ khách hàng
                            </div>
                        </div>
                        <div className={cx('item', 'col-md-4')}>
                            <div className={cx('sticker')}>
                                <img
                                    src="https://demo2wpopal.b-cdn.net/freshio/wp-content/uploads/2020/08/2.png"
                                    alt="1"
                                />
                            </div>
                            <div className={cx('title')}>Cung cấp số lượng lớn</div>
                            <div className={cx('desc')}>
                                Với chuỗi 12 nông trại có mặt trên khắp tỉnh thành, Freshio luôn trong tư thế sẵn sàng
                            </div>
                        </div>
                        <div className={cx('item', 'col-md-4')}>
                            <div className={cx('sticker')}>
                                <img
                                    src="https://demo2wpopal.b-cdn.net/freshio/wp-content/uploads/2020/08/3.png"
                                    alt="1"
                                />
                            </div>
                            <div className={cx('title')}>Chăm sóc khách hàng</div>
                            <div className={cx('desc')}>
                                Hỗ trợ khách hàng 24/7, giải đáp mọi thắc mắc, đặt hàng mọi lúc mọi nơi
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('product')}>
                <div className={cx('text-editor')}>Discover</div>
                <div className={cx('heading')}>Sản phẩm của chúng tôi</div>

                <div className={cx('tab')}>
                    <div className={cx('tab-link', `${key === '' ? 'active' : ''}`)} onClick={() => handleFilter('')}>
                        Tất cả
                    </div>

                    {typeData.data !== undefined && (
                        <>
                            {typeData.data.map((item) => (
                                <div
                                    className={cx('tab-link', `${key === `${item.productTypeID}` ? 'active' : ''}`)}
                                    onClick={() => handleFilter(`${item.productTypeID}`)}
                                >
                                    {item.nameProductType}
                                </div>
                            ))}
                        </>
                    )}
                </div>
                {data.data !== undefined && data.data.length > 0 && (
                    <div className={cx('row', 'wrapper')}>
                        {data.data
                            .filter((post) => {
                                return key === '' ? post : post.productTypeID == key;
                            })
                            .filter((item) => {
                                return item.status == 'ACTIVE';
                            })
                            .slice(0, 10)
                            .map((post, index) => (
                                <div key={post.productID} className={cx('product-block', 'col-md-2dot4')}>
                                    <Link to={`/product/${post.productID}`}>
                                        <div className={cx('product-img')}>
                                            <img src={post.avatarImageProduct} alt="product" />
                                        </div>
                                        <div className={cx('product-name')}>{post.nameProduct}</div>
                                    </Link>
                                    <div className={cx('product-price')}>
                                        {parseInt(post.price).toLocaleString('vi-VN')} VND
                                    </div>
                                    <button onClick={() => addToCart(post)} className={cx('product-add')}>
                                        Thêm giỏ hàng
                                        <FontAwesomeIcon className={cx('add-icon')} icon={faAnglesRight} />
                                    </button>
                                    <ToastContainer position="bottom-right" />
                                </div>
                            ))}
                    </div>
                )}
            </div>

            <div className={cx('reason')}>
                <div className={cx('reason-bg')}>
                    <div className={cx('text-editor')}>Discover</div>
                    <div className={cx('heading')}>Sản phẩm của chúng tôi</div>

                    <div className={cx('wrapper', 'row')}>
                        <div className="col-md-6"></div>
                        <div className={cx('reason-list', 'col-md-6')}>
                            <div className={cx('reason-item')}>
                                <div className={cx('reason-drop')}>
                                    <FontAwesomeIcon icon={faCircleChevronDown} />
                                </div>
                                <div className={cx('reason-text')}>Trồng bằng phân bón tự nhiên</div>
                            </div>
                            <div className={cx('reason-item')}>
                                <div className={cx('reason-drop')}>
                                    <FontAwesomeIcon icon={faCircleChevronDown} />
                                </div>
                                <div className={cx('reason-text')}>Cỏ dại được kiểm soát tự nhiên</div>
                            </div>
                            <div className={cx('reason-item')}>
                                <div className={cx('reason-drop')}>
                                    <FontAwesomeIcon icon={faCircleChevronDown} />
                                </div>
                                <div className={cx('reason-text')}>Phòng bệnh bằng phương pháp tự nhiên</div>
                            </div>
                            <div className={cx('reason-item')}>
                                <div className={cx('reason-drop')}>
                                    <FontAwesomeIcon icon={faCircleChevronDown} />
                                </div>
                                <div className={cx('reason-text')}>Sản phẩm hữu cơ chứa ít thuốc trừ sâu hơn</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('feedback')}>
                <div className={cx('wrapper')}>
                    <div className={cx('row')}>
                        <div className={cx('person', 'col-md-4')}>
                            <div className={cx('avatar')}>
                                <img
                                    src="https://images2.thanhnien.vn/Uploaded/thaodn/2023_01_29/quang-hai-1-357-158.jpg"
                                    alt="avatar"
                                />
                            </div>
                            <div className={cx('speech')}>
                                "Một điểm đáng khen khác là cách thức phục vụ của nhân viên cửa hàng. Họ rất thân thiện
                                và nhiệt tình, luôn sẵn sàng giúp đỡ tôi trong quá trình mua hàng."
                            </div>
                            <div className={cx('info')}>Tùng - Food Dong Anh Store</div>
                        </div>
                        <div className={cx('person', 'col-md-4')}>
                            <div className={cx('avatar')}>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Son_Tung_M-TP_1_%282017%29.png"
                                    alt="avatar"
                                />
                            </div>
                            <div className={cx('speech')}>
                                "Sản phẩm của cửa hàng rất đa dạng và chất lượng. Tôi đã tìm thấy sản phẩm mình cần với
                                giá cả hợp lý và chất lượng tốt. Quá trình đặt hàng và thanh toán cũng rất thuận tiện và
                                an toàn"
                            </div>
                            <div className={cx('info')}>Tùng Thanh - Food MTP Store</div>
                        </div>
                        <div className={cx('person', 'col-md-4')}>
                            <div className={cx('avatar')}>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf0seM_9lhRNLCVKBa_PlSYUnzYMjLWw9wbLv89_xgEycb125YYIeM6mCfk_O-PfSVyMc&usqp=CAU"
                                    alt="avatar"
                                />
                            </div>
                            <div className={cx('speech')}>
                                "Tôi thực sự rất hài lòng với trải nghiệm của mình tại cửa hàng này và tôi sẽ quay lại
                                đây mua sắm mỗi khi cần thiết. Cảm ơn cửa hàng đã cung cấp dịch vụ tuyệt vời như vậy!"
                            </div>
                            <div className={cx('info')}>Nguyễn Văn Rô - Food Portugal</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('brand')}>
                <div className={cx('wrapper', 'row')}>
                    <div className={cx('logo', 'col-md-2')}>
                        <img src={brand1} alt="brand1" />
                    </div>
                    <div className={cx('logo', 'col-md-2')}>
                        <img src={brand2} alt="brand1" />
                    </div>
                    <div className={cx('logo', 'col-md-2')}>
                        <img src={brand3} alt="brand1" />
                    </div>
                    <div className={cx('logo', 'col-md-2')}>
                        <img src={brand4} alt="brand1" />
                    </div>
                    <div className={cx('logo', 'col-md-2')}>
                        <img src={brand5} alt="brand1" />
                    </div>
                    <div className={cx('logo', 'col-md-2')}>
                        <img src={brand6} alt="brand1" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
