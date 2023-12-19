import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import productService from '~/services/productService';
import productTypeService from '~/services/productTypeService';
import 'bootstrap/dist/css/bootstrap.css';
import style from '~/pages/Admin/Page.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

function CreateComponent({ pageNumber, setPageNumber }) {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    };

    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [discount, setDiscount] = useState('');
    const [typeData, setTypeData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await productTypeService.getAll();
            setTypeData(response);
        };
        fetchData();
    }, []);
    console.log(typeData);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('productTypeID', type);
        formData.append('nameProduct', name);
        formData.append('price', price);
        formData.append('avartarImageProduct', image);
        formData.append('title', title);
        formData.append('discount', discount);
        setPageNumber({ ...pageNumber });
        //thêm nhiều ảnh
        // if (event.target.files && event.target.files.length > 0) {
        //     for (let i = 0; i < event.target.files.length; i++) {
        //         formData.append('image', event.target.files[i]);
        //     }
        // }
        // const formDataObject = {};
        // formData.forEach((value, key) => {
        //     formDataObject[key] = value;
        // });
        // console.log(formDataObject);

        const response = await productService.create(formData);

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
                                value={type}
                                className={cx('modal-input')}
                                onChange={(event) => setType(event.target.value)}
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
