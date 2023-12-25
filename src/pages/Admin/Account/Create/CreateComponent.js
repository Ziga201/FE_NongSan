import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import accountService from '~/services/accountService';
import decentralizationService from '~/services/decentralizationService';
import 'bootstrap/dist/css/bootstrap.css';
import style from '~/pages/Admin/Page.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function CreateComponent() {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    };

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [authorityName, setAuthorityName] = useState(1);
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
        formData.append('avatar', avatar);
        formData.append('email', email);
        formData.append('status', status);
        formData.append('decentralizationID', authorityName);

        const response = await accountService.create(formData);

        if (response.data.status === 200) {
            alert('Thêm thành công');
        } else {
            alert('Thêm thất bại');
        }
        event.target.reset();
        initModal();
    };

    return (
        <>
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
                            required
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
                        <select
                            value={status}
                            className={cx('modal-input')}
                            onChange={(event) => setStatus(event.target.value)}
                        >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                        </select>
                        <input
                            type="file"
                            className={cx('modal-input')}
                            onChange={(event) => setAvatar(event.target.files[0])}
                        />
                        {type.data !== undefined && (
                            <select
                                value={authorityName}
                                className={cx('modal-input')}
                                onChange={(event) => setAuthorityName(event.target.value)}
                            >
                                {type.data.map((item) => (
                                    <option key={item.decentralizationID} value={item.decentralizationID}>
                                        {item.authorityName} || id: {item.decentralizationID}
                                    </option>
                                ))}
                            </select>
                        )}
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
