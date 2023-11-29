import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import style from '~/pages/Admin/Page.module.scss';
// import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useState, useEffect } from 'react';
import messageService from '~/services/messageService';

const cx = classNames.bind(style);

function Message() {
    const [messages, setMessages] = useState({});

    const fetchMessages = async () => {
        setMessages(await messageService.getMessages());
    };

    useEffect(() => {
        fetchMessages();
    }, [messages]);

    const deleteMessage = async (id, e) => {
        var response = await messageService.deleteMessage(id);
        if (response.data.success === true) {
            alert('Xoá thành công');
            document.getElementById(id).parentElement.remove();
        } else {
            alert(response.data.msg);
        }
    };

    return (
        <div className={cx('hug')}>
            <div className={cx('heading')}>
                <div className="col">
                    <div className={cx('name_table')}>Danh mục lời nhắn</div>
                </div>
            </div>

            {messages.data !== undefined && messages.data.data.length > 0 && (
                <div className={cx('wrapper')}>
                    <table className="table" style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên khách hàng</th>
                                <th>Email</th>
                                <th>Chủ đề</th>
                                <th>Lời nhắn</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.data.data.map((message, index) => (
                                <tr>
                                    <td>{index}</td>

                                    <td>{message.name}</td>
                                    <td>{message.email}</td>
                                    <td>{message.topic}</td>
                                    <td className={cx('content-fix-2')}>{message.message}</td>

                                    <td>
                                        <button
                                            style={{ marginLeft: '5px', fontSize: '16px' }}
                                            id={message._id}
                                            onClick={(e) => deleteMessage(message._id, e)}
                                            className="btn btn-danger"
                                        >
                                            Xoá
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Message;
