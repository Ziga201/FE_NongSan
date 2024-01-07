import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import productService from '~/services/productService';
import productTypeService from '~/services/productTypeService';
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

    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('ACTIVE');
    const [discount, setDiscount] = useState('');
    const [productTypeID, setProductTypeID] = useState(1);
    const [typeData, setTypeData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await productTypeService.getAll();
            setTypeData(response);
        };
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('productTypeID', productTypeID);
        formData.append('nameProduct', name);
        formData.append('price', price);
        formData.append('avatarImageProduct', image);
        formData.append('title', title);
        formData.append('discount', discount);
        formData.append('status', status);

        const response = await productService.create(formData);

        props.setUpdate(new Date());
        toast.success(response.data.message);

        event.target.reset();
        initModal();
    };

    return (
        <>
            <Button variant="primary" onClick={initModal}>
                Thêm
            </Button>
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title>Thêm</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        {typeData.data !== undefined && (
                            <select
                                value={productTypeID}
                                className={cx('modal-input')}
                                onChange={(event) => setProductTypeID(event.target.value)}
                            >
                                {typeData.data.map((item) => (
                                    <option key={item.productTypeID} value={item.productTypeID}>
                                        {item.nameProductType}
                                    </option>
                                ))}
                            </select>
                        )}

                        <input
                            type="text"
                            placeholder="Nhập tên sản phẩm"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                            className={cx('modal-input')}
                        />
                        <input
                            type="text"
                            placeholder="Nhập giá sản phẩm"
                            value={price}
                            className={cx('modal-input')}
                            onChange={(event) => setPrice(event.target.value)}
                            required
                        />
                        <input
                            type="file"
                            className={cx('modal-input')}
                            onChange={(event) => setImage(event.target.files[0])}
                        />

                        <input
                            type="text"
                            placeholder="Nhập tiêu đề"
                            value={title}
                            className={cx('modal-input')}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Nhập giảm giá"
                            value={discount}
                            className={cx('modal-input')}
                            onChange={(event) => setDiscount(event.target.value)}
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
