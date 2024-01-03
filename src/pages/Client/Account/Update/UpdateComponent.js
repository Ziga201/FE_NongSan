import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import accountService from '~/services/accountService';
import style from '~/pages/Admin/Page.module.scss';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
const cx = classNames.bind(style);
function UpdateComponent(props) {
    const [isShow, invokeModal] = useState(false);

    const initModal = () => {
        return invokeModal(!isShow);
    };

    const [accountID] = useState(props.accountID);
    const [userName, setUserName] = useState(props.userName);
    const [password, setPassword] = useState(props.password);
    const [email, setEmail] = useState(props.email);
    const [avatar, setAvatar] = useState(props.avatar);
    const [fullName, setFullName] = useState(props.fullName);
    const [phone, setPhone] = useState(props.phone);
    const [address, setAddress] = useState(props.address);

    // useEffect(() => {
    //     if (props) {
    //         setUserName(props.userName);
    //         // setPassword(props.password);
    //         // setEmail(props.email);
    //         // setAvatar(props.avatar);
    //         // setFullName(props.fullName);
    //         // setPhone(props.phone);
    //         // setAddress(props.address);
    //     }
    // }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('accountID', accountID);
        formData.append('userName', userName);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('avatar', avatar);
        formData.append('fullName', fullName);
        formData.append('phone', phone);
        formData.append('address', address);

        toast('Vui lòng chờ...');
        const response = await accountService.update(formData);
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
                            type="text"
                            placeholder="Nhập tên khách hàng"
                            value={fullName}
                            className={cx('modal-input')}
                            onChange={(event) => setFullName(event.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nhập số điện thoại"
                            value={phone}
                            className={cx('modal-input')}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nhập địa chỉ"
                            value={address}
                            className={cx('modal-input')}
                            onChange={(event) => setAddress(event.target.value)}
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
