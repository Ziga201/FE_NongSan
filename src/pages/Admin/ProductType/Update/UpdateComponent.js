import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import productTypeService from '~/services/productTypeService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

        props.setUpdate(new Date());
        toast.success(response.data.message);

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
