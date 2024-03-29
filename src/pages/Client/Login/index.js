import style from './Login.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import accountService from '~/services/accountService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function Login() {
    const [user, setUser] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('userName', username);
        formData.append('password', password);
        toast.success('Vui lòng chờ');

        const response = await accountService.login(formData);
        if (response.data.status === 200) {
            localStorage.setItem('jwtToken', response.data.data.accessToken);
            toast.success(response.data.message);
            navigate('/');
        } else {
            toast.error(response.data.message);
        }
    };

    return (
        <>
            <div className={cx('login-wrap')}>
                <div className={cx('login-text')}>Đăng nhập</div>

                <form className={cx('form')} onSubmit={handleSubmit}>
                    <label>Tên tài khoản</label>
                    <input
                        type="text"
                        value={username}
                        className={cx('input')}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br />
                    <div className={cx('password')}>
                        <label>Mật khẩu</label>
                        <Link to="/forgotpassword" className={cx('fotgot-password')}>
                            Quên mật khẩu ?
                        </Link>
                    </div>

                    <input
                        type="password"
                        value={password}
                        className={cx('input')}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button className={cx('button')} type="submit">
                        Đăng nhập
                    </button>
                    <ToastContainer position="bottom-right" />
                </form>
                <p className={cx('p')}>
                    Bạn chưa có tài khoản ?{' '}
                    <Link to="/signup">
                        <span className={cx('sign')}>Đăng ký</span>
                    </Link>
                </p>
            </div>
        </>
    );
}

export default Login;
