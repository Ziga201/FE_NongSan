import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import orderService from '~/services/orderService';
import 'bootstrap/dist/css/bootstrap.css';
import style from '~/pages/Admin/Page.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

function ListComponent(props) {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    };

    const [order, setOrder] = useState(props.orderDetailDTOs);

    const handleSubmit = async (event) => {
        event.preventDefault();
        initModal();
    };
    console.log(order);

    return (
        <>
            <Button variant="primary" onClick={initModal}>
                Danh sách
            </Button>
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title>Danh sách sản phẩm</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        {order !== undefined && (
                            <div>
                                {order.map((item) => (
                                    <div className={cx('product')}>
                                        <img src={item.avatarImageProduct} alt="Product Image" />
                                        <div className={cx('product-info')}>
                                            <div>{item.nameProduct}</div>
                                            <span>x{item.quantity}</span>
                                            <div>Giá: {item.priceTotal}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="dark">
                            Đóng
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default ListComponent;
