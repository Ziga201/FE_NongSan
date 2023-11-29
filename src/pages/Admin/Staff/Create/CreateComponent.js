import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import staffService from '~/services/staffService';
import 'bootstrap/dist/css/bootstrap.css';

// import classNames from 'classnames/bind';
// import style from '~/pages/';
// const cx = classNames.bind(style);

function CreateComponent() {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    };

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [position, setPosition] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('image', image);
        formData.append('phone', phone);
        formData.append('position', position);

        const response = await staffService.create(formData);
        if (response.data.success === true) {
            setMessage('Tạo nhân viên thành công');
        } else {
            setMessage('Tạo nhân viên thất bại');
        }

        setTimeout(() => {
            setMessage('');
        }, 2000);

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
                            name="name"
                            placeholder="Nhập tên nhân viên"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Nhập địa chỉ"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Nhập số điện thoại"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                        />
                        <input
                            type="text"
                            name="position"
                            placeholder="Nhập chức vụ"
                            value={position}
                            onChange={(event) => setPosition(event.target.value)}
                            required
                        />
                        <input type="file" name="file" onChange={(event) => setImage(event.target.files[0])} />
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
