import style from './Login.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import accountService from '~/services/accountService';

const cx = classNames.bind(style);

function Login() {
    const [accounts, setAccounts] = useState({});

    const fetchAccounts = async () => {
        setAccounts(await accountService.getAccounts());
    };

    useEffect(() => {
        fetchAccounts();
    }, [accounts]);

    // Login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        localStorage.setItem('admin', true);
        localStorage.setItem('user', true);
        // accounts.data.data.forEach((element) => {
        //     // if (element.username == username && element.password == password) {
        //     //     // alert('MK đúng');
        //     //     localStorage.setItem('user', element.username);
        //     //     window.location.href = '/admin';
        //     // }

        //     if (element.username == username && element.password == password && element.decentralization == 'Admin') {
        //         // alert('MK đúng');
        //         localStorage.setItem('admin', true);
        //         window.location.href = '/admin';
        //     } else if (
        //         element.username == username &&
        //         element.password == password &&
        //         element.decentralization == 'User'
        //     ) {
        //         // alert('MK đúng');
        //         const user = {
        //             id: element._id,
        //             username: element.username,
        //             decentralization: element.decentralization,
        //         };

        //         localStorage.setItem('info', JSON.stringify(user));
        //         localStorage.setItem('user', true);
        //         localStorage.setItem('admin', true);
        //         window.location.href = '/';
        //     }
        // });
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
                    <label>Mật khẩu</label>

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
