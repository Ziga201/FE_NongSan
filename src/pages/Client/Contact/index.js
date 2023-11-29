import style from './Contact.module.scss';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import messageService from '~/services/messageService';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [topic, setTopic] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append('topic', topic);
        formData.append('message', message);

        const response = await messageService.create(formData);
        if (response.data.success === true) {
            toast.success('Gửi lời nhắn thành công !');
        } else {
            toast.success('Gửi lời nhắn thất bại !');
        }

        // setTimeout(() => {
        //     setMessage('');
        // }, 2000);

        event.target.reset();
        // initModal();
    };

    return (
        <>
            <div className={cx('banner')}>
                <div className={cx('wrapper')}>
                    <div className={cx('heading')}>Liên hệ</div>
                    <div className={cx('path')}>
                        <Link to="/" className={cx('link')}>
                            Trang chủ
                        </Link>
                        <FontAwesomeIcon style={{ margin: '0 5px' }} icon={faAngleRight} />
                        <span className={cx('page')}>Liên hệ</span>
                    </div>
                </div>
            </div>

            <div className={cx('wrapper')} style={{ padding: '70px 0 50px' }}>
                <div className={cx('row')}>
                    <div className={cx('col-md-5', 'item')}>
                        <img
                            src="https://demo2wpopal.b-cdn.net/freshio/wp-content/uploads/2020/08/contact1.jpg"
                            alt="anh"
                        />
                    </div>
                    <div className={cx('col-md-7', 'item')}>
                        <div className={cx('title')}>Chúng tôi thích nghe từ bạn</div>
                        <div className={cx('desc')}>
                            Chúng tôi xin gửi lời chào trân trọng và đại diện cho đội ngũ nhân viên của chúng tôi, tôi
                            muốn mời quý khách đến thăm cửa hàng của chúng tôi. Với đội ngũ nhân viên chuyên nghiệp và
                            tận tâm, chúng tôi cam kết sẽ mang đến cho quý khách trải nghiệm mua sắm tuyệt vời nhất
                        </div>
                        <div className={cx('row')}>
                            <div className={cx('col-md-5')}>
                                <div className={cx('child-item')}>
                                    <div className={cx('child-title')}>Địa chỉ</div>
                                    <div className={cx('child-desc')}>
                                        99 Vũ Trọng Phụng, Thanh Xuân <div> Hà Nội</div>
                                    </div>
                                </div>
                                <div className={cx('child-item')}>
                                    <div className={cx('child-title')}>Liên hệ</div>
                                    <div className={cx('child-desc')}>
                                        1900 9900 <div> tungdonganh@gmail.com</div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-md-5')}>
                                <div className={cx('child-item')}>
                                    <div className={cx('child-title')}>Giờ làm việc</div>
                                    <div className={cx('child-desc')}>
                                        Thứ 2 - Thứ 6<div style={{ fontWeight: 600 }}> 9 AM - 4 PM</div>
                                        <div>Thứ 7, Chủ nhật</div>
                                        <div style={{ fontWeight: 600 }}> 8 AM - 7 PM</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('message')}>
                            <div className={cx('title')}>Để Lại Lời Nhắn</div>
                            <form onSubmit={handleSubmit}>
                                <input
                                    className={cx('message-input')}
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                    placeholder="Tên của ban"
                                ></input>
                                <input
                                    className={cx('message-input')}
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                    placeholder="Email"
                                ></input>
                                <input
                                    className={cx('message-input')}
                                    type="text"
                                    name="topic"
                                    value={topic}
                                    onChange={(event) => setTopic(event.target.value)}
                                    required
                                    placeholder="Chủ đề"
                                ></input>
                                <textarea
                                    className={cx('message-input')}
                                    type="text"
                                    name="message"
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    required
                                    placeholder="Lời nhắn"
                                ></textarea>
                                <button className={cx('message-btn')} type="submit">
                                    Gửi
                                </button>
                            </form>
                            <ToastContainer position="bottom-right" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
