import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import productService from '~/services/productService';
import style from '~/pages/Admin/Page.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function UpdateComponent(props) {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    };

    const [id] = useState(props.id);
    const [type, setType] = useState(props.type);
    const [name, setName] = useState(props.name);
    const [price, setPrice] = useState(props.price);
    const [image, setImage] = useState(props.image);
    const [title, setTitle] = useState(props.title);
    const [discount, setDiscount] = useState(props.type);
    const [status, setStatus] = useState(props.status);
    const [typeData, setTypeData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await productService.getAllType();
            setTypeData(response.data);
        };
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('productID', id);
        formData.append('productTypeID', type);
        formData.append('nameProduct', name);
        formData.append('price', price);
        formData.append('avartarImageProduct', image);
        formData.append('title', title);
        formData.append('discount', discount);
        formData.append('status', status);

        const response = await productService.update(formData);

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
                        {/* <input
                            type="text"
                            placeholder="Nhập loại"
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                            required
                        /> */}
                        <input
                            type="text"
                            placeholder="Nhập tên sản phẩm"
                            value={name}
                            className={cx('modal-input')}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Nhập giá sản phẩm"
                            value={price}
                            className={cx('modal-input')}
                            onChange={(event) => setPrice(event.target.value)}
                            required
                        />
                        <input type="file" name="file" onChange={(event) => setImage(event.target.files[0])} />
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
                            <option value="INACTIVE">INACTIVE</option>
                            <option value="ACTIVE">ACTIVE</option>
                        </select>
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
