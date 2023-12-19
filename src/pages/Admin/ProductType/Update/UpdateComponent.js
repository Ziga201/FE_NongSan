import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import productTypeService from '~/services/productTypeService';

function UpdateComponent(props) {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    };

    const [productTypeID] = useState(props.productTypeID);
    const [nameProductType, setNameProductType] = useState(props.nameProductType);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('productTypeID', productTypeID);
        formData.append('nameProductType', nameProductType);

        const response = await productTypeService.update(formData);

        if (response.data.status === 200) {
            alert('Sửa thành công');
        } else {
            alert('Sửa thất bại');
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
                            placeholder="Nhập loại sản phẩm"
                            value={nameProductType}
                            onChange={(event) => setNameProductType(event.target.value)}
                            required
                        />
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
