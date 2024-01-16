import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import productService from '~/services/productService';
import productTypeService from '~/services/productTypeService';
import style from '~/pages/Admin/Page.module.scss';
import classNames from 'classnames/bind';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cx = classNames.bind(style);
function UpdateComponent(props) {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    };

    const [productID] = useState(props.productID);
    const [productTypeID, setProductTypeID] = useState(props.productTypeID);
    const [nameProduct, setNameProduct] = useState(props.nameProduct);
    const [price, setPrice] = useState(props.price);
    const [avatarImageProduct, setAvatarImageProduct] = useState(props.avatarImageProduct);
    const [describe, setDescribe] = useState(props.describe);
    const [discount, setDiscount] = useState(props.discount);
    const [quantity, setQuantity] = useState(props.quantity);
    const [status, setStatus] = useState(props.status);
    const [typeData, setTypeData] = useState([]);

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
        formData.append('productID', productID);
        formData.append('productTypeID', productTypeID);
        formData.append('nameProduct', nameProduct);
        formData.append('price', price);
        formData.append('avatarImageProduct', avatarImageProduct);
        formData.append('describe', describe);
        formData.append('discount', discount);
        formData.append('status', status);
        formData.append('quantity', quantity);
        toast.success('Vui lòng chờ !');

        const response = await productService.update(formData);
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
                            value={nameProduct}
                            className={cx('modal-input')}
                            onChange={(event) => setNameProduct(event.target.value)}
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
                        <input
                            type="file"
                            name="file"
                            onChange={(event) => setAvatarImageProduct(event.target.files[0])}
                        />
                        <input
                            type="text"
                            placeholder="Nhập mô tả"
                            value={describe}
                            className={cx('modal-input')}
                            onChange={(event) => setDescribe(event.target.value)}
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
                        <input
                            type="number"
                            placeholder="Nhập số lượng"
                            value={quantity}
                            className={cx('modal-input')}
                            onChange={(event) => setQuantity(event.target.value)}
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
