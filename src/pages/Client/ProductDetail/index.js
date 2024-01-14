import style from './ProductDetail.module.scss';
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import productService from '~/services/productService';
import cartService from '~/services/cartService';
import { faAnglesRight, faCircleCheck, faMedal, faStar as regularStar } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import { faStar } from '@fortawesome/free-regular-svg-icons';
const cx = classNames.bind(style);
function ProductDetail() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [relate, setRelate] = useState([]);
    const [review, setReview] = useState([]);
    const [account, setAccount] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const jwtToken = localStorage.getItem('jwtToken');
            if (jwtToken) {
                try {
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
            const response = await productService.getProductByID(id);
            setData(response.data.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await productService.getRelatedProduct(data.productTypeID);
            setRelate(response);
        };
        fetchData();
    }, [data]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await productService.getProductReview(id);
            setReview(response);
        };
        fetchData();
    }, []);

    const addToCart = async (item) => {
        const formData = new FormData();

        formData.append('accountID', account.Id);
        formData.append('productID', item);

        const response = await cartService.addToCart(formData);
        toast.success(response.data.message);
    };

    const handleStar = (rate) => {
        const stars = [];
        for (let index = 1; index <= 5; index++) {
            const isRegular = index <= rate;
            stars.push(
                <FontAwesomeIcon key={index} className={cx('review-icon')} icon={isRegular ? regularStar : faStar} />,
            );
        }
        return stars;
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div style={{ marginTop: '150px' }} className={cx('product', 'row')}>
                    <div className={cx('col-md-6')}>
                        <div className={cx('image')}>
                            <img src={data.avatarImageProduct} alt="product" />
                        </div>
                    </div>
                    <div className={cx('info', 'col-md-6')}>
                        <div className={cx('name')}>{data.nameProduct}</div>
                        <div className={cx('price')}>{parseInt(data.price).toLocaleString('vi-VN')} VND</div>
                        <div className={cx('message')}>
                            {/* <FontAwesomeIcon icon={faMedal} /> */}
                            <div className={cx('certify')}>
                                <div className={cx('certify-item')}>
                                    <FontAwesomeIcon icon={faCircleCheck} /> Chứng nhận vệ sinh an toàn thực phẩm
                                    (VSATTP)
                                </div>
                                <div className={cx('certify-item')}>
                                    <FontAwesomeIcon icon={faCircleCheck} /> Sử dụng 100% phân bón hữu cơ
                                </div>
                                <div className={cx('certify-item')}>
                                    <FontAwesomeIcon icon={faCircleCheck} /> Nguồn gốc nhập khẩu rõ ràng
                                </div>
                            </div>
                        </div>
                        <div className={cx('category')}>
                            Danh mục: <span>{data.nameProductType}</span>
                        </div>
                        <div className={cx('add')}>
                            {data.quantity > 0 ? (
                                <button onClick={() => addToCart(data.productID)} className={cx('add-btn')}>
                                    Thêm giỏ hàng
                                </button>
                            ) : (
                                <button className={cx('add-btn', 'add-btn-disabled')} disabled>
                                    Hết hàng
                                </button>
                            )}

                            <ToastContainer position="bottom-right" />
                        </div>
                        <div className={cx('desc')}>
                            <div className={cx('describe')}>Mô tả</div>
                        </div>
                    </div>
                </div>

                <div className={cx('product', 'row')}>
                    <div className={cx('heading')}>Sản phẩm liên quan</div>
                    {relate.data !== undefined && relate.data.length > 0 && (
                        <div className={cx('row', 'wrapper')}>
                            {relate.data
                                .filter((item) => {
                                    return item.status == 'ACTIVE';
                                })
                                .slice(0, 5)
                                .map((item, index) => (
                                    <div key={item.productID} className={cx('product-block', 'col-md-2dot4')}>
                                        <Link to={`/product/${item.productID}`}>
                                            <div className={cx('product-img')}>
                                                <img src={item.avatarImageProduct} alt="product" />
                                            </div>
                                            <div className={cx('product-name')}>{item.nameProduct}</div>
                                        </Link>
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

                <div className={cx('product', 'row')}>
                    <div className={cx('heading')}>Đánh giá sản phẩm</div>
                    {review.data !== undefined && review.data.length > 0 && (
                        <div className={cx('wrapper')}>
                            {review.data.map((item, index) => (
                                <div key={item.productReviewID} className={cx('review-product')}>
                                    <div className={cx('avatar', 'col-md-1')}>
                                        <img src={item.avatar} />
                                    </div>
                                    <div className={cx('review', 'col-md-11')}>
                                        <div className={cx('username')}>{item.userName}</div>
                                        <div className={cx('star')}>{handleStar(item.pointEvaluation)}</div>
                                        <div className={cx('createdAt')}>{item.createdAt}</div>
                                        <div className={cx('content')}>{item.content}</div>
                                        <div className={cx('image-review')}>
                                            <img src={item.image} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
