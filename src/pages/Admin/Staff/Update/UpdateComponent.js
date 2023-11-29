import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import StaffService from '~/services/staffService';
// import classNames from 'classnames/bind';
// import style from './Update.module.scss';

// const cx = classNames.bind(style);

function UpdateComponent(props) {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    };

    const [name, setName] = useState(props.name);
    const [address, setAddress] = useState(props.address);
    const [id, setId] = useState(props.id);
    const [selectedFile, setSelectedFile] = useState('');
    const [phone, setPhone] = useState(props.phone);
    const [position, setPosition] = useState(props.position);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('address', address);

        if (selectedFile !== '' && selectedFile.length !== 0) {
            formData.append('image', selectedFile);
        }
        formData.append('phone', phone);
        formData.append('position', position);
        const response = await StaffService.update(formData);

        if (response.data.success === true) {
            alert(response.data.msg);
        } else {
            alert(response.data.msg);
        }

        initModal();
    };

    return (
        <>
            <Button variant="success" onClick={initModal} style={{ fontSize: '16px' }}>
                Sửa
            </Button>
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title>Sửa</Modal.Title>
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
                        <input type="file" name="file" onChange={(event) => setSelectedFile(event.target.files[0])} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="dark">
                            Sửa
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default UpdateComponent;
