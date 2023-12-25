import style from './Account.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
// import UpdateComponent from '~/pages/Admin/Account/Update/UpdateComponent';
import UpdateComponent from './Update/UpdateComponent';
import accountService from '~/services/accountService';
import { jwtDecode } from 'jwt-decode';

const cx = classNames.bind(style);
function Account() {
    const jwtToken = localStorage.getItem('jwtToken');
    const responseJWT = jwtDecode(jwtToken);

    const [data, setData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const response = await accountService.getAccountByID(responseJWT.Id);
            setData(response.data);
        };
        fetchData();
    }, []);

    const signOut = () => {
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
                            <span className={cx('login-info')}>{data.userName}</span>
                            <br></br>
                            <label className={cx('login-text')}>Mật khẩu: </label>{' '}
                            <span
                                style={{
                                    maxWidth: '100px',
                                    display: 'inline-block',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                }}
                                className={cx('login-info', 'login-pass')}
                            >
                                {data.password}
                            </span>
                            <br></br>
                            {/* <label className={cx('login-text')}>Tên khách hàng: </label>{' '}
                            <span className={cx('login-info')}>{data.name}</span> */}
                            <br></br>
                            <label className={cx('login-text')}>Email: </label>{' '}
                            <span className={cx('login-info')}>{data.email}</span>
                        </div>
                        <div className={cx('col-md-4')}>
                            <div className={cx('avatar')}>
                                <img src={data.avatar} alt="blog" />
                            </div>
                        </div>
                    </div>
                    <div className={cx('button')}>
                        <UpdateComponent
                            accountID={data.accountID}
                            userName={data.userName}
                            password={data.password}
                            email={data.email}
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
