import style from './Home.module.scss';
import React, { useState, useEffect } from 'react';

import postService from '~/services/postService';
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
// import { Tab, TabList, TabPanel } from 'react-tabs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function Home() {
    // console.log(brand);

    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        setPosts(await postService.getPosts());
    };

    useEffect(() => {
        fetchPosts();
    }, [posts]);

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

            // const newCartItems = [...cartItems, item];
            // setCartItems(newCartItems);
            // localStorage.setItem('cartItems', JSON.stringify(newCartItems));
            // const data = JSON.parse(localStorage.getItem('cartItems'));
            const product = {
                id: item._id,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: 1,
            };
            const itemIndex = cartItems.findIndex((i) => i.id === item._id);
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
    const handleClick = (productId) => {
        // <Navigate to={`/product/${productId}`} />;
        window.location.href = `/product/${productId}`;
    };

    // Filter item
    const [key, setKey] = useState('');
    const handleFilter = (key) => {
        setKey(key);
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
                    <div
                        className={cx('tab-link', `${key === 'Trái cây & Rau củ' ? 'active' : ''}`)}
                        onClick={() => handleFilter('Trái cây & Rau củ')}
                    >
                        Trái cây
                    </div>
                    <div
                        className={cx('tab-link', `${key === 'Hạt giống & cây trồng' ? 'active' : ''}`)}
                        onClick={() => handleFilter('Hạt giống & cây trồng')}
                    >
                        Hạt giống
                    </div>
                    <div
                        className={cx('tab-link', `${key === 'Sản phẩm đóng gói' ? 'active' : ''}`)}
                        onClick={() => handleFilter('Sản phẩm đóng gói')}
                    >
                        Đóng gói
                    </div>
                </div>
                {posts.data !== undefined && posts.data.data.length > 0 && (
                    <div className={cx('row', 'wrapper')}>
                        {posts.data.data
                            .filter((post) => {
                                return key.toLowerCase() === ''
                                    ? post
                                    : post.category.toLowerCase().includes(key.toLowerCase());
                            })
                            .slice(0, 10)
                            .map((post, index) => (
                                <div key={post._id} className={cx('product-block', 'col-md-2dot4')}>
                                    <div onClick={() => handleClick(post._id)}>
                                        <div className={cx('product-img')}>
                                            <img
                                                src={'http://localhost:8000/api/postImages/' + post.image}
                                                alt="product"
                                            />
                                        </div>
                                        <div className={cx('product-name')}>{post.name}</div>
                                    </div>
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
