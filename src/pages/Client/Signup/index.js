import style from '~/pages/Client/Login/Login.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import accountService from '~/services/accountService';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [showSignup, setShowSignup] = useState(true);
    const [showComfirm, setShowComfirm] = useState(false);
    const [countdown, setCountdown] = useState(120);
    const [expired, setExpired] = useState(false);
    const [update, setUpdate] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('userName', username);
        formData.append('password', password);
        formData.append('email', email);

        // for (let entry of formData.entries()) {
        //     console.log(entry[0], entry[1]);
        // }
        toast.success('Vui lòng chờ...');

        const response = await accountService.register(formData);

        if (response.data.status == 200) {
            toast.success(response.data.message);
            setEmail(response.data.data.email);
            setShowSignup(false);
            setCountdown(120);
            setExpired(false);
            setShowComfirm(true);
            setUpdate(new Date());
        } else {
            toast.error(response.data.message);
        }

        event.target.reset();
    };

    useEffect(() => {
        let timer;

        if (showComfirm) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown > 0) {
                        return prevCountdown - 1;
                    } else {
                        setExpired(true);
                        clearInterval(timer);
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [update]);

    const handleSubmitCode = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('codeActive', code);

        const response = await accountService.active(formData);
        if (response.data.status == 200) {
            toast.success(response.data.message);

            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } else {
            toast.error(response.data.message);
        }
        event.target.reset();
    };

    const handleResend = async () => {
        const formData = new FormData();
        formData.append('email', email);
        const response = await accountService.sendCode(formData);
        toast.success(response.data.message);
        setCountdown(120);
        setExpired(false);
        setUpdate(new Date());
    };

    return (
        <>
            <div className={cx('login-wrap')}>
                <div className={cx('login-text')}>Đăng ký</div>

                {showSignup && (
                    <form className={cx('form')} onSubmit={handleSubmit}>
                        <label>Tên tài khoản</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                            className={cx('input')}
                        />
                        <br />
                        <label>Mật khẩu</label>

                        <input
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            className={cx('input')}
                            data-type="password"
                        />
                        <br />
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            className={cx('input')}
                        />
                        <br />

                        <button className={cx('button')} type="submit">
                            Đăng ký
                        </button>
                    </form>
                )}
                {showComfirm && (
                    <form className={cx('form')} onSubmit={handleSubmitCode}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            className={cx('input')}
                        />
                        <br />
                        <label>Nhập mã xác thực</label>
                        <div className={cx('form-countdown')}>
                            <input
                                type="text"
                                value={code}
                                onChange={(event) => setCode(event.target.value)}
                                required
                                className={cx('input')}
                            />
                            <div className={cx('countdown')}>
                                <span>{countdown}s</span>
                                {expired && (
                                    <span onClick={handleResend} className={cx('countdown-span')}>
                                        {' '}
                                        Gửi lại
                                    </span>
                                )}
                            </div>
                        </div>

                        <br />
                        <button className={cx('button')} type="submit">
                            Xác nhận
                        </button>
                    </form>
                )}

                <p className={cx('p')}>
                    Bạn đã có tài khoản ?{' '}
                    <Link to="/login">
                        <span className={cx('sign')}>Đăng nhập</span>
                    </Link>
                </p>
                <ToastContainer position="bottom-right" />
            </div>
        </>
    );
}

export default Login;
