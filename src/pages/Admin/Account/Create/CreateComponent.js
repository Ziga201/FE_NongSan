import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import accountService from '~/services/accountService';
import decentralizationService from '~/services/decentralizationService';
import 'bootstrap/dist/css/bootstrap.css';
import style from '~/pages/Admin/Page.module.scss';
import classNames from 'classnames/bind';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cx = classNames.bind(style);
function CreateComponent(props) {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    };

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('ACTIVE');
    const [decentralizationID, setDecentralizationID] = useState(1);
    const [avatar, setAvatar] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await decentralizationService.getAll();
            setType(response);
        };
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('userName', userName);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('status', status);
        formData.append('decentralizationID', decentralizationID);
        formData.append('avatar', avatar);
        formData.append('fullName', fullName);
        formData.append('phone', phone);
        formData.append('address', address);

        const response = await accountService.create(formData);
        props.setUpdate(new Date());
        toast.success(response.data.message);

        event.target.reset();
        initModal();
    };

    return (
        <>
            <ToastContainer position="bottom-right" />
            <Button variant="primary" onClick={initModal} style={{ fontSize: '16px' }}>
                Thêm
            </Button>
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title>Thêm</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <input
                            type="text"
                            placeholder="Nhập tài khoản"
                            value={userName}
                            className={cx('modal-input')}
                            onChange={(event) => setUserName(event.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            className={cx('modal-input')}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Nhập Email"
                            value={email}
                            className={cx('modal-input')}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Nhập tên khách hàng"
                            value={fullName}
                            className={cx('modal-input')}
                            onChange={(event) => setFullName(event.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nhập số điện thoại"
                            value={phone}
                            className={cx('modal-input')}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nhập địa chỉ"
                            value={address}
                            className={cx('modal-input')}
                            onChange={(event) => setAddress(event.target.value)}
                        />
                        <select
                            value={status}
                            className={cx('modal-input')}
                            onChange={(event) => setStatus(event.target.value)}
                        >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                        </select>
                        {type.data !== undefined && (
                            <select
                                value={decentralizationID}
                                className={cx('modal-input')}
                                onChange={(event) => setDecentralizationID(event.target.value)}
                            >
                                {type.data.map((item) => (
                                    <option key={item.decentralizationID} value={item.decentralizationID}>
                                        {item.authorityName}
                                    </option>
                                ))}
                            </select>
                        )}
                        <input
                            type="file"
                            className={cx('modal-input')}
                            onChange={(event) => setAvatar(event.target.files[0])}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="dark">
                            Thêm
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default CreateComponent;
