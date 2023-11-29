import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import BlogService from '~/services/blogService';
// import classNames from 'classnames/bind';
// import style from './Update.module.scss';

// const cx = classNames.bind(style);

function UpdateComponent(props) {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    };

    const [title, setTitle] = useState(props.title);
    const [content, setContent] = useState(props.content);
    const [id, setId] = useState(props.id);
    const [selectedFile, setSelectedFile] = useState('');
    const [author, setAuthor] = useState(props.author);
    // const [createAt, setCreateAt] = useState(props.createAt);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const createAt = `${day}/${month}/${year}`;

        const formData = new FormData();
        formData.append('id', id);
        formData.append('title', title);
        formData.append('content', content);

        if (selectedFile !== '' && selectedFile.length !== 0) {
            formData.append('image', selectedFile);
        }
        formData.append('author', author);
        formData.append('createAt', createAt);

        const response = await BlogService.update(formData);

        if (response.data.success === true) {
            alert(response.data.msg);
        } else {
            alert(response.data.msg);
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
                        <input type="file" name="file" onChange={(event) => setSelectedFile(event.target.files[0])} />
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
                            Sửa
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default UpdateComponent;
