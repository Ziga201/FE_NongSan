import style from '~/pages/Client/Login/Login.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import accountService from '~/services/accountService';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    // const [decentralization, setDecentralization] = useState('');

    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        const decentralization = 'User';

        formData.append('username', username);
        formData.append('password', password);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('image', image);
        formData.append('decentralization', decentralization);

        const response = await accountService.create(formData);
        if (response.data.success === true) {
            setMessage('Tạo tài khoản thành công');
            toast.success('Đăng ký tài khoản thành công !');
        } else {
            setMessage('Tạo tài khoản thất bại');
            toast.success('Đăng ký tài khoản thất bại !');
        }

        setTimeout(() => {
            setMessage('');
        }, 2000);

        event.target.reset();
        // initModal();
    };

    return (
        <>
            <div className={cx('login-wrap')}>
                <div className={cx('login-text')}>Đăng nhập</div>

                <form className={cx('form')} onSubmit={handleSubmit}>
                    <label>Tên tài khoản</label>
                    <input
                        id="user"
                        type="text"
                        name="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                        className={cx('input')}
                    />
                    <br />
                    <label>Mật khẩu</label>

                    <input
                        id="pass"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        className={cx('input')}
                        data-type="password"
                    />
                    <br />
                    <label>Tên khách hàng</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        className={cx('input')}
                    />
                    <br />
                    <label>Email</label>
                    <input
                        id="pass"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        className={cx('input')}
                    />
                    <br />
                    <input type="file" name="file" onChange={(event) => setImage(event.target.files[0])} />

                    <button className={cx('button')} type="submit">
                        Đăng ký
                    </button>
                </form>
                <p className={cx('p')}>
                    Bạn đã có tài khoản ?{' '}
                    <Link to="/login">
                        <span className={cx('sign')}>Đăng nhập</span>
                    </Link>
                </p>
                <ToastContainer position="bottom-right" />
            </div>

            {/* <div className={cx('login-wrap')}>
                <div className={cx('login-html')}>
                    <input id="tab-1" type="radio" name="tab" className={cx('sign-in')} checked />
                    <label for="tab-1" className={cx('tab')}>
                        Đăng ký
                    </label>
                    <input id="tab-2" type="radio" name="tab" className={cx('sign-up')} />
                    <label for="tab-2" className={cx('tab')}>
                        <Link to="/login">Đăng nhập</Link>
                    </label>
                    <form onSubmit={handleSubmit} className={cx('login-form')}>
                        <div className={cx('foot-lnk')}>
                            <div className={cx('group')}>
                                <label for="user" className={cx('label')}>
                                    Tài khoản
                                </label>
                                <input
                                    id="user"
                                    type="text"
                                    name="username"
                                    placeholder="Nhập tài khoản"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    required
                                    className={cx('input')}
                                />
                            </div>
                            <div className={cx('group')}>
                                <label for="pass" className={cx('label')}>
                                    Mật khẩu
                                </label>
                                <input
                                    id="pass"
                                    name="password"
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    className={cx('input')}
                                    data-type="password"
                                />
                            </div>
                            
                            <div className={cx('group')}>
                                <label for="pass" className={cx('label')}>
                                    Tên khách hàng
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Nhập tên"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                    className={cx('input')}
                                />
                            </div>
                            <div className={cx('group')}>
                                <label for="pass" className={cx('label')}>
                                    Email
                                </label>
                                <input
                                    id="pass"
                                    type="email"
                                    name="email"
                                    placeholder="Nhập email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                    className={cx('input')}
                                />
                            </div>

                            <div className={cx('group')}>
                                <input type="file" name="file" onChange={(event) => setImage(event.target.files[0])} />
                            </div>
                            <div className={cx('group')}>
                                <input type="submit" className={cx('button')} value="Đăng ký" />
                            </div>
                            
                        </div>
                    </form>
                </div>
                
            </div> */}
        </>
    );
}

export default Login;
