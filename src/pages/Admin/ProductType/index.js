import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';

import style from '~/pages/Admin/Page.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import productTypeService from '~/services/productTypeService';
import UpdateComponent from './Update/UpdateComponent';
import CreateComponent from './Create/CreateComponent';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import * as React from 'react';

const cx = classNames.bind(style);

function ProductType() {
    const [data, setData] = useState({});
    const [update, setUpdate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await productTypeService.getAll();
            setData(response);
        };
        fetchData();
    }, [update]);

    const deleteProductType = async (id, e) => {
        var response = await productTypeService.delete(id);
        toast.success(response.data.message);
    };

    const formatDate = (date) => {
        const dateObject = new Date(date);

        const formattedDate = format(dateObject, 'HH:mm dd-MM-yyyy');
        return formattedDate;
    };
    // Search item
    const [search, setSearch] = useState('');

    return (
        <div className={cx('hug')}>
            <div className={cx('heading')}>
                <div className={cx('search')}>
                    <input
                        type="text"
                        className={cx('search-input')}
                        placeholder="Nhập tên sản phẩm ..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                </div>
                <ToastContainer position="bottom-right" />
                <CreateComponent setUpdate={setUpdate} />
            </div>

            {data.data !== undefined && (
                <div className={cx('wrapper')}>
                    <table className="table" style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Loại sản phẩm</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data
                                .filter((item) => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.nameProductType.toLowerCase().includes(search.toLowerCase());
                                })
                                .map((item, index) => (
                                    <tr key={item.productTypeID}>
                                        <td>{index + 1}</td>
                                        <td>{item.nameProductType}</td>
                                        <td>{formatDate(item.createdAt)}</td>
                                        <td>{formatDate(item.updateAt)}</td>
                                        <td>
                                            <UpdateComponent
                                                productTypeID={item.productTypeID}
                                                nameProductType={item.nameProductType}
                                                setUpdate={setUpdate}
                                            />
                                            <button
                                                style={{ marginLeft: '5px', fontSize: '16px' }}
                                                id={item.productTypeID}
                                                onClick={(e) => deleteProductType(item.productTypeID, e)}
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

export default ProductType;
