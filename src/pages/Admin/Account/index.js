import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import style from '~/pages/Admin/Page.module.scss';
// import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';
import accountService from '~/services/accountService';

import CreateComponent from './Create/CreateComponent';
import UpdateComponent from './Update/UpdateComponent';

const cx = classNames.bind(style);

function Account() {
    const [accounts, setAccounts] = useState({});

    const fetchAccounts = async () => {
        setAccounts(await accountService.getAccounts());
    };

    useEffect(() => {
        fetchAccounts();
    }, [accounts]);

    const deleteAccount = async (id, e) => {
        var response = await accountService.deleteAccount(id);
        if (response.data.success === true) {
            alert('Xoá thành công');
            document.getElementById(id).parentElement.remove();
        } else {
            alert(response.data.msg);
        }
    };
    const [search, setSearch] = useState('');

    return (
        <div className={cx('hug')}>
            <div className={cx('heading')}>
                <div className="col">
                    <div className={cx('name_table')}>Danh mục tài khoản</div>
                </div>

                <CreateComponent />
            </div>
            <div className={cx('search')}>
                <input
                    type="text"
                    className={cx('search-input')}
                    placeholder="Nhập tài khoản ..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
            </div>

            {accounts.data !== undefined && accounts.data.data.length > 0 && (
                <div className={cx('wrapper')}>
                    <table className="table" style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tài khoản</th>
                                <th>Mật khẩu</th>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>Ảnh</th>
                                <th>Quyền</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.data.data
                                .filter((account) => {
                                    return search.toLowerCase() === ''
                                        ? account
                                        : account.username.toLowerCase().includes(search.toLowerCase());
                                })
                                .map((account, index) => (
                                    <tr>
                                        <td>{index}</td>
                                        <td>{account.username}</td>
                                        <td>{account.password}</td>

                                        <td>{account.name}</td>
                                        <td>{account.email}</td>
                                        <td>
                                            <img
                                                src={'http://localhost:8000/api/accountImages/' + account.image}
                                                style={{ width: '50px', height: '50px' }}
                                                alt="blog"
                                            />
                                        </td>
                                        <td>{account.decentralization}</td>

                                        <td>
                                            <UpdateComponent
                                                id={account._id}
                                                username={account.username}
                                                password={account.password}
                                                name={account.name}
                                                email={account.email}
                                                decentralization={account.decentralization}
                                                style={{ fontSize: '16px' }}
                                            />
                                            <button
                                                style={{ marginLeft: '5px', fontSize: '16px' }}
                                                id={account._id}
                                                onClick={(e) => deleteAccount(account._id, e)}
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
