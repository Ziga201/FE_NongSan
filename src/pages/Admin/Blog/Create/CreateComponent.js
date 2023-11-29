import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import blogService from '~/services/blogService';
import 'bootstrap/dist/css/bootstrap.css';

// import classNames from 'classnames/bind';
// import style from '~/pages/';
// const cx = classNames.bind(style);

function CreateComponent() {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    };

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [author, setAuthor] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const createAt = `${day}/${month}/${year}`;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);
        formData.append('author', author);
        formData.append('createAt', createAt);

        const response = await blogService.create(formData);
        if (response.data.success === true) {
            setMessage('Tạo Blog thành công');
        } else {
            setMessage('Blog Tạo Blog thất bại');
        }

        setTimeout(() => {
            setMessage('');
        }, 2000);

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
                            name="title"
                            placeholder="Nhập tiêu đề bài viết"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                        />
                        <textarea
                            type="text"
                            name="content"
                            placeholder="Nhập nội dung"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            required
                        />
                        <input type="file" name="file" onChange={(event) => setImage(event.target.files[0])} />
                        <input
                            type="text"
                            name="author"
                            placeholder="Nhập tên tác giả"
                            value={author}
                            onChange={(event) => setAuthor(event.target.value)}
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
