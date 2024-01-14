import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import productService from '~/services/productService';
import 'bootstrap/dist/css/bootstrap.css';
import style from '~/pages/Admin/Page.module.scss';
import classNames from 'classnames/bind';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRating from '../Star/StarRating';
const cx = classNames.bind(style);
function EvaluateComponent(props) {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    };

    const [productID] = useState(props.productID);
    const [accountID] = useState(props.accountID);
    const [pointEvaluation, setPointEvaluation] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('productID', productID);
        formData.append('accountID', accountID);
        formData.append('pointEvaluation', pointEvaluation);
        formData.append('content', content);
        formData.append('image', image);

        const response = await productService.addProductReview(formData);
        toast.success(response.data.result.message);
        props.setUpdate(new Date());

        event.target.reset();
        initModal();
    };

    return (
        <>
            <Button variant="primary" onClick={initModal} style={{ fontSize: '16px' }}>
                Đánh giá
            </Button>
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title>Thêm</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        {/* <input
                            type="number"
                            placeholder="Nhập sao đánh giá"
                            value={pointEvaluation}
                            className={cx('modal-input')}
                            onChange={(event) => setPointEvaluation(event.target.value)}
                        /> */}
                        <StarRating setPointEvaluation={setPointEvaluation} />
                        <input
                            type="text"
                            placeholder="Nhập nội dung"
                            value={content}
                            className={cx('modal-input')}
                            onChange={(event) => setContent(event.target.value)}
                            required
                        />
                        <input
                            type="file"
                            className={cx('modal-input')}
                            onChange={(event) => setImage(event.target.files[0])}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="dark">
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default EvaluateComponent;
