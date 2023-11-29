import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import style from '~/pages/Admin/Page.module.scss';
// import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useState, useEffect } from 'react';
import staffService from '~/services/staffService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import CreateComponent from './Create/CreateComponent';
import UpdateComponent from './Update/UpdateComponent';

const cx = classNames.bind(style);

function Staff() {
    const [staffs, setStaffs] = useState({});

    const fetchStaffs = async () => {
        setStaffs(await staffService.getStaffs());
    };

    useEffect(() => {
        fetchStaffs();
    }, [staffs]);

    const deleteStaff = async (id, e) => {
        var response = await staffService.deleteStaff(id);
        if (response.data.success === true) {
            alert('Xoá thành công');
            document.getElementById(id).parentElement.remove();
        } else {
            alert(response.data.msg);
        }
    };
    // Search item
    const [search, setSearch] = useState('');

    return (
        <div className={cx('hug')}>
            <div className={cx('heading')}>
                <div className="col">
                    <div className={cx('name_table')}>Danh mục nhân viên</div>
                </div>

                <CreateComponent />
            </div>
            <div className={cx('search')}>
                <input
                    type="text"
                    className={cx('search-input')}
                    placeholder="Nhập tên nhân viên ..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
            </div>
            {staffs.data !== undefined && staffs.data.data.length > 0 && (
                <div className={cx('wrapper')}>
                    <table className="table" style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên nhân viên</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th>Chức vụ</th>
                                <th>Ảnh</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffs.data.data
                                .filter((staff) => {
                                    return search.toLowerCase() === ''
                                        ? staff
                                        : staff.name.toLowerCase().includes(search.toLowerCase());
                                })
                                .map((staff, index) => (
                                    <tr>
                                        <td>{index}</td>
                                        <td>{staff.name}</td>
                                        <td>{staff.address}</td>
                                        <td>{staff.phone}</td>
                                        <td>{staff.position}</td>
                                        <td>
                                            <img
                                                src={'http://localhost:8000/api/staffImages/' + staff.image}
                                                style={{ width: '50px', height: '50px' }}
                                                alt="staff"
                                            />
                                        </td>

                                        <td>
                                            <UpdateComponent
                                                id={staff._id}
                                                name={staff.name}
                                                address={staff.address}
                                                phone={staff.phone}
                                                position={staff.position}
                                                style={{ fontSize: '16px' }}
                                            />
                                            <button
                                                style={{ marginLeft: '5px', fontSize: '16px' }}
                                                id={staff._id}
                                                onClick={(e) => deleteStaff(staff._id, e)}
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

export default Staff;
