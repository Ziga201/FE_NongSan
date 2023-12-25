import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import style from '~/pages/Admin/Page.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';
import accountService from '~/services/accountService';

import CreateComponent from './Create/CreateComponent';
import UpdateComponent from './Update/UpdateComponent';

const cx = classNames.bind(style);

function Account() {
    const [data, setData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const response = await accountService.getAll();
            setData(response);
        };
        fetchData();
    }, []);

    const deleteAccount = async (id, e) => {
        var response = await accountService.delete(id);

        alert(response.data.message);
    };
    const [search, setSearch] = useState('');

    return (
        <div className={cx('hug')}>
            <div className={cx('heading')}>
                <div className={cx('search')}>
                    <input
                        type="text"
                        className={cx('search-input')}
                        placeholder="Nhập tài khoản ..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                </div>

                <CreateComponent />
            </div>

            {data.data !== undefined && (
                <div className={cx('wrapper')}>
                    <table className="table" style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tài khoản</th>
                                <th>Mật khẩu</th>
                                <th>Avatar</th>
                                <th>Email</th>
                                <th>Trạng thái</th>
                                <th>Quyền</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data
                                .filter((item) => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.userName.toLowerCase().includes(search.toLowerCase());
                                })
                                .map((item, index) => (
                                    <tr key={item.accountID}>
                                        <td>{index + 1}</td>
                                        <td>{item.userName}</td>
                                        <td data-fulltext={item.password}>{item.password}</td>
                                        <td>
                                            <img
                                                src={item.avatar}
                                                style={{ width: '50px', height: '50px' }}
                                                alt="avatar"
                                            />
                                        </td>
                                        <td>{item.email}</td>
                                        <td>{item.status}</td>
                                        <td>{item.authorityName}</td>
                                        <td>
                                            <UpdateComponent
                                                accountID={item.accountID}
                                                userName={item.userName}
                                                password={item.password}
                                                avatar={item.avatar}
                                                email={item.email}
                                                status={item.status}
                                                authorityName={item.authorityName}
                                            />
                                            <button
                                                style={{ marginLeft: '5px', fontSize: '16px' }}
                                                id={item.accountID}
                                                onClick={(e) => deleteAccount(item.accountID, e)}
                                                className="btn btn-danger"
                                            >
                                                Xoá
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Account;
