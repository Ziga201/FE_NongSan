import style from './Account.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import UpdateComponent from '~/pages/Admin/Account/Update/UpdateComponent';
import UpdateComponent from './Update/UpdateComponent';
import accountService from '~/services/accountService';

const cx = classNames.bind(style);
const info = JSON.parse(localStorage.getItem('info'));
function Account() {
    const [account, setAccount] = useState({});

    const fetchAccounts = async () => {
        setAccount((await accountService.getAccountById(info.id)).data.data);
    };

    useEffect(() => {
        fetchAccounts();
    }, [account]);

    const signOut = () => {
        localStorage.removeItem('info');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };
    return (
        <>
            <div className="">
                <div className={cx('login-wrap')}>
                    <div className={cx('login-heading')}>Hồ sơ của tôi</div>
                    <div className={cx('row')}>
                        <div className={cx('col-md-8')}>
                            <label className={cx('login-text')}>Tài khoản: </label>{' '}
                            <span className={cx('login-info')}>{account.username}</span>
                            <br></br>
                            <label className={cx('login-text')}>Mật khẩu: </label>{' '}
                            <span className={cx('login-info', 'login-pass')}>{account.password}</span>
                            <br></br>
                            <label className={cx('login-text')}>Tên khách hàng: </label>{' '}
                            <span className={cx('login-info')}>{account.name}</span>
                            <br></br>
                            <label className={cx('login-text')}>Email: </label>{' '}
                            <span className={cx('login-info')}>{account.email}</span>
                        </div>
                        <div className={cx('col-md-4')}>
                            <div className={cx('avatar')}>
                                <img src={'http://localhost:8000/api/accountImages/' + account.image} alt="blog" />
                            </div>
                        </div>
                    </div>
                    <div className={cx('button')}>
                        <UpdateComponent
                            id={account._id}
                            username={account.username}
                            password={account.password}
                            name={account.name}
                            email={account.email}
                            decentralization={account.decentralization}
                            style={{ fontSize: '16px' }}
                        />
                        <div onClick={() => signOut()} className={cx('btn', 'btn-success')}>
                            Đăng xuất
                        </div>
                    </div>
                </div>
                ;
            </div>
        </>
    );
}

export default Account;
