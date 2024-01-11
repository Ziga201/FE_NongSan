import style from '~/pages/Client/Login/Login.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import accountService from '~/services/accountService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [codeActive, setCodeActive] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {}, [showForm]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        toast.success('Vui lòng chờ...');
        const response = await accountService.sendCode(formData);
        if (response.data.status == 200) {
            toast.success(response.data.message);
            setTimeout(() => {
                setShowForm(true);
            }, 3000);
        } else {
            toast.error(response.data.message);
        }
    };
    const handleSubmitPassword = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('codeActive', codeActive);
        formData.append('newPassword', newPassword);
        const response = await accountService.forgotPassword(formData);

        if (response.data.status == 200) {
            toast.success(response.data.message);
            setTimeout(() => {
                window.location.href = '/login';
            }, 3000);
        } else {
            toast.error(response.data.message);
        }
    };

    return (
        <>
            <div className={cx('login-wrap')}>
                <div className={cx('login-text')}>Quên mật khẩu</div>

                {!showForm && (
                    <form className={cx('form')} onSubmit={handleSubmit}>
                        <label>Nhập email</label>
                        <input
                            type="email"
                            value={email}
                            className={cx('input')}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <button className={cx('button')} type="submit">
                            Nhận mã xác thực
                        </button>
                        <ToastContainer position="bottom-right" />
                    </form>
                )}
                {showForm && (
                    <form className={cx('form')} onSubmit={handleSubmitPassword}>
                        <label>Nhập email</label>
                        <input
                            type="email"
                            value={email}
                            className={cx('input')}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <label>Mã xác thực</label>
                        <input
                            type="text"
                            value={codeActive}
                            className={cx('input')}
                            onChange={(e) => setCodeActive(e.target.value)}
                        />
                        <br />
                        <label>Mật khẩu mới</label>
                        <input
                            type="password"
                            value={newPassword}
                            className={cx('input')}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <br />
                        <button className={cx('button')} type="submit">
                            Xác nhận
                        </button>
                        <ToastContainer position="bottom-right" />
                    </form>
                )}
            </div>
        </>
    );
}

export default ForgotPassword;
