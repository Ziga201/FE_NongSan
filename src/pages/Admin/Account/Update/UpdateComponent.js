import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AccountService from '~/services/accountService';
// import classNames from 'classnames/bind';
// import style from './Update.module.scss';

// const cx = classNames.bind(style);

function UpdateComponent(props) {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    };

    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState(props.password);
    const [id, setId] = useState(props.id);
    const [name, setName] = useState(props.name);
    const [email, setEmail] = useState(props.email);
    const [selectedFile, setSelectedFile] = useState('');
    const [decentralization, setDecentralization] = useState(props.decentralization);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('id', id);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('decentralization', decentralization);

        if (selectedFile !== '' && selectedFile.length !== 0) {
            formData.append('image', selectedFile);
        }

        const response = await AccountService.update(formData);

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
                            name="username"
                            placeholder="Nhập tài khoản"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />
                        <input
                            type="text"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Nhập tên"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                        <input type="file" name="file" onChange={(event) => setSelectedFile(event.target.files[0])} />

                        <select
                            name="decentralization"
                            value={decentralization}
                            onChange={(event) => setDecentralization(event.target.value)}
                        >
                            <option value="Admin">Admin</option>
                            <option value="User" selected>
                                User
                            </option>
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
