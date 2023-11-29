import style from './Footer.module.scss';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHeadphonesSimple } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(style);

function Header() {
    return (
        <>
            <div className={cx('footer')}>
                <div className={cx('line1')}>
                    <div className={cx('wrapper', 'row')}>
                        <div className={cx('contact', 'col-md-2')}>
                            <div className={cx('logo')}>
                                <FontAwesomeIcon icon={faHeadphonesSimple} />
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('text')}>Liên lạc 24/7</div>
                                <div className={cx('number')}>1800-88-66-99</div>
                            </div>
                        </div>
                        <div className={cx('social', 'col-md-6')}>
                            <div className={cx('social-text')}>FOLLOW US</div>
                            <div className={cx('social-icon')}>
                                <FontAwesomeIcon className={cx('font-icon')} icon={faFacebook} />
                                <FontAwesomeIcon className={cx('font-icon')} icon={faYoutube} />
                                <FontAwesomeIcon className={cx('font-icon')} icon={faTwitter} />
                                <FontAwesomeIcon className={cx('font-icon')} icon={faInstagram} />
                            </div>
                        </div>
                        <div className={cx('payment', 'col-md-4')}>
                            <img
                                src="https://demo2wpopal.b-cdn.net/freshio/wp-content/uploads/2020/08/payment_1.png"
                                alt="payment"
                            />
                        </div>
                    </div>
                </div>

                <div className={cx('wrapper')}>
                    <div className={cx('line2')}>
                        <div className={cx('row')}>
                            <div className={cx('col-md-2dot4')}>
                                <div className={cx('heading')}>ĐỊA CHỈ CỬA HÀNG</div>
                                <div className={cx('desc')}>
                                    <div className={cx('desc-item')}>99 Vũ Trọng Phụng, Thanh Xuân</div>
                                    <div className={cx('desc-item')}>Hà Nội</div>
                                    <div className={cx('email')}>tungdonganhshop@gmail.com</div>
                                </div>
                            </div>
                            <div className={cx('col-md-2dot4')}>
                                <div className={cx('heading')}>THÔNG TIN</div>
                                <div className={cx('desc')}>
                                    <div className={cx('desc-item')}>Về chúng tôi</div>
                                    <div className={cx('desc-item')}>Blog</div>
                                    <div className={cx('desc-item')}>Thủ tục thanh toán</div>
                                    <div className={cx('desc-item')}>Liên hệ</div>
                                    <div className={cx('desc-item')}>Dịch vụ</div>
                                </div>
                            </div>
                            <div className={cx('col-md-2dot4')}>
                                <div className={cx('heading')}>TÀI KHOẢN CỦA TÔI</div>
                                <div className={cx('desc')}>
                                    <div className={cx('desc-item')}>Tài khoản của tôi</div>
                                    <div className={cx('desc-item')}>Liên hệ</div>
                                    <div className={cx('desc-item')}>Giỏ hàng</div>
                                    <div className={cx('desc-item')}>Cửa hàng</div>
                                    <div className={cx('desc-item')}></div>
                                </div>
                            </div>
                            <div className={cx('col-md-2dot4')}>
                                <div className={cx('heading')}>THỂ LOẠI</div>
                                <div className={cx('desc')}>
                                    <div className={cx('desc-item')}>Rau củ quả</div>
                                    <div className={cx('desc-item')}>Sản phẩm từ sữa</div>
                                    <div className={cx('desc-item')}>Thực phẩm đóng gói</div>
                                    <div className={cx('desc-item')}>Đồ uống</div>
                                    <div className={cx('desc-item')}>Sức khỏe & Đời sống</div>
                                </div>
                            </div>
                            <div className={cx('col-md-2dot4')}>
                                <div className={cx('heading')}>ĐĂNG KÝ CHÚNG TÔI</div>
                                <div className={cx('desc')}>
                                    <div className={cx('desc-item')}>
                                        Đăng ký và nhận phiếu mua hàng trị giá $250,00
                                    </div>
                                    <div className={cx('desc-item')}>Chase, MD 20815</div>
                                    <form className={cx('form')} action="">
                                        <input type="email" placeholder="Nhập email của bạn" className={cx('input')} />
                                        <div className={cx('submit')}>
                                            <FontAwesomeIcon className={cx('submit-icon')} icon={faArrowRight} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
