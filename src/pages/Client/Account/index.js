import style from './Account.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import UpdateComponent from './Update/UpdateComponent';
import accountService from '~/services/accountService';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(style);
function Account() {
    const jwtToken = localStorage.getItem('jwtToken');
    const responseJWT = jwtDecode(jwtToken);
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [update, setUpdate] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const response = await accountService.getAccountByID(responseJWT.Id);
            setData(response.data);
        };
        fetchData();
    }, [update]);

    console.log(responseJWT.role);

    const signOut = () => {
        navigate('/login');
        localStorage.removeItem('jwtToken');
    };

    return (
        <>
            {data != null && (
                <div className="">
                    <div className={cx('login-wrap')}>
                        <div className={cx('login-heading')}>Hồ sơ của tôi</div>
                        <div className={cx('row')}>
                            <div className={cx('col-md-8')}>
                                <div>
                                    <label className={cx('login-text')}>Tài khoản: </label>{' '}
                                    <span className={cx('login-info')}>{data.userName}</span>
                                </div>

                                <div>
                                    <label className={cx('login-text')}>Mật khẩu: </label>{' '}
                                    <span className={cx('login-info', 'login-pass')}>****************</span>
                                </div>

                                <div>
                                    <label className={cx('login-text')}>Email: </label>{' '}
                                    <span className={cx('login-info')}>{data.email}</span>
                                </div>
                                <div>
                                    <label className={cx('login-text')}>Tên khách hàng: </label>{' '}
                                    <span className={cx('login-info')}>{data.fullName}</span>
                                </div>
                                <div>
                                    <label className={cx('login-text')}>Số điện thoại: </label>{' '}
                                    <span className={cx('login-info')}>{data.phone}</span>
                                </div>
                                <div>
                                    <label className={cx('login-text')}>Địa chỉ: </label>{' '}
                                    <span className={cx('login-info')}>{data.address}</span>
                                </div>
                            </div>
                            <div className={cx('col-md-4')}>
                                <div className={cx('avatar')}>
                                    <img src={data.avatar} alt="blog" />
                                </div>
                            </div>
                        </div>
                        <div className={cx('button')}>
                            {responseJWT.role == 'Admin' && (
                                <div className={cx('btn', 'btn-success')}>
                                    <Link to="/admin">Admin</Link>
                                </div>
                            )}

                            <UpdateComponent
                                accountID={data.accountID}
                                userName={data.userName}
                                password={data.password}
                                email={data.email}
                                status={data.status}
                                decentralizationID={data.decentralizationID}
                                avatar={data.avatar}
                                fullName={data.fullName}
                                phone={data.phone}
                                address={data.address}
                                setUpdate={setUpdate}
                            />
                            <div onClick={() => signOut()} className={cx('btn', 'btn-success')}>
                                Đăng xuất
                            </div>
                        </div>
                    </div>
                    <ToastContainer position="bottom-right" />;
                </div>
            )}
        </>
    );
}

export default Account;
