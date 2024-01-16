import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import blogService from '~/services/blogService';
import blogTypeService from '~/services/blogTypeService';
import accountService from '~/services/accountService';
import 'bootstrap/dist/css/bootstrap.css';
import style from '~/pages/Admin/Page.module.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function CreateComponent(props) {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    };

    const [blogTypeID, setBlogTypeID] = useState(1);
    const [accountID, setAccountID] = useState(1);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [typeData, setTypeData] = useState([]);
    const [account, setAccount] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await blogTypeService.getAll();
            setTypeData(response);
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const response = await accountService.getAll();
            setAccount(response);
        };
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('blogTypeID', blogTypeID);
        formData.append('accountID', accountID);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);
        toast.success('Vui lòng chờ !');

        const response = await blogService.create(formData);

        props.setUpdate(new Date());
        toast.success(response.data.message);

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
                        {typeData.data !== undefined && typeData.data.length > 0 && (
                            <select
                                value={blogTypeID}
                                className={cx('modal-input')}
                                onChange={(event) => setBlogTypeID(event.target.value)}
                            >
                                {typeData.data.map((item) => (
                                    <option key={item.blogTypeID} value={item.blogTypeID}>
                                        {item.blogTypeName}
                                    </option>
                                ))}
                            </select>
                        )}

                        {account.data !== undefined && account.data.length > 0 && (
                            <select
                                value={accountID}
                                className={cx('modal-input')}
                                onChange={(event) => setAccountID(event.target.value)}
                            >
                                {account.data.map((item) => (
                                    <option key={item.accountID} value={item.accountID}>
                                        {item.fullName}
                                    </option>
                                ))}
                            </select>
                        )}
                        <input
                            type="text"
                            name="title"
                            placeholder="Nhập tiêu đề bài viết"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            className={cx('modal-input')}
                            required
                        />
                        <textarea
                            type="text"
                            name="content"
                            placeholder="Nhập nội dung"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            className={cx('modal-input')}
                            required
                        />
                        <input type="file" name="file" onChange={(event) => setImage(event.target.files[0])} />
                        <ToastContainer position="bottom-right" />
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
