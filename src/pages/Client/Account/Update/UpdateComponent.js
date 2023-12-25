import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import accountService from '~/services/accountService';
import style from '~/pages/Admin/Page.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
function UpdateComponent(props) {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    };

    const [accountID] = useState(props.accountID);
    const [userName, setUserName] = useState(props.userName);
    const [password, setPassword] = useState(props.password);
    const [avatar, setAvatar] = useState(props.avatar);
    const [email, setEmail] = useState(props.email);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('accountID', accountID);
        formData.append('userName', userName);
        formData.append('password', password);
        formData.append('avatar', avatar);
        formData.append('email', email);

        const response = await accountService.update(formData);
        console.log(response);

        alert(response.data.message);

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
                            placeholder="Nhập tài khoản"
                            value={userName}
                            className={cx('modal-input')}
                            onChange={(event) => setUserName(event.target.value)}
                            disabled={true}
                        />
                        <input
                            type="text"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            className={cx('modal-input')}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Nhập Email"
                            value={email}
                            className={cx('modal-input')}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />

                        <input
                            type="file"
                            className={cx('modal-input')}
                            onChange={(event) => setAvatar(event.target.files[0])}
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
