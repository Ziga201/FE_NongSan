import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import productTypeService from '~/services/productTypeService';
import 'bootstrap/dist/css/bootstrap.css';

function CreateComponent() {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    };

    const [nameProductType, setNameProductType] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('nameProductType', nameProductType);

        const response = await productTypeService.create(formData);

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
                            placeholder="Nhập loại sản phẩm"
                            value={nameProductType}
                            onChange={(event) => setNameProductType(event.target.value)}
                            required
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
