import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';

import style from '~/pages/Admin/Page.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import productService from '~/services/productService';
import productTypeService from '~/services/productTypeService';

import UpdateComponent from './Update/UpdateComponent';
import CreateComponent from './Create/CreateComponent';
import Pagination from '@mui/material/Pagination';
import * as React from 'react';

const cx = classNames.bind(style);

function Product() {
    const [data, setData] = useState({});
    const [pageNumber, setPageNumber] = useState({
        pageNumber: 1,
        pageSize: 6,
    });
    const [totalPages, setTotalPages] = useState();
    const [typeData, setTypeData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const response = await productService.getAll(pageNumber.pageSize, pageNumber.pageNumber);
            // console.log(response);
            setData(response.data);
            setTotalPages(response.data.pagination.totalPage);
        };
        fetchData();
    }, [pageNumber]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await productTypeService.getAll();
            setTypeData(response);
        };
        fetchData();
    }, []);
    console.log(typeData.data);

    const handlePageClick = (event, value) => {
        setPageNumber({ pageNumber: value, pageSize: 6 });
    };
    // console.log(totalPages);

    const deleteProduct = async (id, e) => {
        var response = await productService.delete(id);
        if (response.data.status === 200) {
            alert('Xoá thành công');
            document.getElementById(id).remove();
        } else {
            alert(response.data.message);
        }
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

                <CreateComponent setPageNumber={setPageNumber} pageNumber={pageNumber} />
            </div>

            {data.data !== undefined && (
                <div className={cx('wrapper')}>
                    <table className="table" style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Loại sản phẩm</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Ảnh</th>
                                <th>Tiêu đề</th>
                                <th>Giảm giá</th>
                                <th>Trạng thái</th>
                                <th>Lượt xem</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data
                                .filter((item) => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.nameProduct.toLowerCase().includes(search.toLowerCase());
                                })
                                .map((item, index) => (
                                    <tr key={item.productID}>
                                        <td>{index + 1}</td>
                                        {typeData.data !== undefined && (
                                            <td>
                                                {
                                                    typeData.data
                                                        .filter((x) => x.productTypeID === item.productTypeID)
                                                        .map((filteredItem) => filteredItem.nameProductType)[0]
                                                }
                                            </td>
                                        )}
                                        <td>{item.nameProduct}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <img
                                                src={item.avartarImageProduct}
                                                style={{ width: '50px', height: '50px' }}
                                                alt="product"
                                            />
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.discount}%</td>
                                        <td>{item.status}</td>
                                        <td>{item.numberOfViews}</td>
                                        <td>
                                            <UpdateComponent
                                                id={item.productID}
                                                type={item.productTypeID}
                                                name={item.nameProduct}
                                                price={item.price}
                                                image={item.avartarImageProduct}
                                                title={item.title}
                                                discount={item.discount}
                                                status={item.status}
                                                style={{ fontSize: '16px' }}
                                            />
                                            <button
                                                style={{ marginLeft: '5px', fontSize: '16px' }}
                                                id={item.productID}
                                                onClick={(e) => deleteProduct(item.productID, e)}
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
            <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                <Pagination count={totalPages} onChange={handlePageClick} color="primary" />
            </div>
        </div>
    );
}

export default Product;
