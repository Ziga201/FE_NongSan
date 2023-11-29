import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import style from '~/pages/Admin/Page.module.scss';
// import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';
import blogService from '~/services/blogService';

import CreateComponent from './Create/CreateComponent';
import UpdateComponent from './Update/UpdateComponent';

const cx = classNames.bind(style);

function Blog() {
    const [blogs, setBlogs] = useState({});

    const fetchBlogs = async () => {
        setBlogs(await blogService.getBlogs());
    };

    useEffect(() => {
        fetchBlogs();
    }, [blogs]);

    const deleteBlog = async (id, e) => {
        var response = await blogService.deleteBlog(id);
        if (response.data.success === true) {
            alert('Xoá thành công');
            document.getElementById(id).parentElement.remove();
        } else {
            alert(response.data.msg);
        }
    };
    // Search item
    const [search, setSearch] = useState('');

    return (
        <div className={cx('hug')}>
            <div className={cx('heading')}>
                <div className="col">
                    <div className={cx('name_table')}>Danh mục bài viết</div>
                </div>
                {/* <Link to="/create">
                    <button className="btn btn-info" style={{ fontSize: '16px' }}>
                        Thêm
                    </button>
                </Link> */}

                <div>
                    <CreateComponent />
                </div>
            </div>
            <div className={cx('search')}>
                <input
                    type="text"
                    className={cx('search-input')}
                    placeholder="Nhập tiêu đề ..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
            </div>

            {blogs.data !== undefined && blogs.data.data.length > 0 && (
                <div className={cx('wrapper')}>
                    <table className={cx('table')} style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tiêu đề</th>
                                <th>Nội dung</th>
                                <th>Ảnh</th>
                                <th>Tác giả</th>
                                <th>Ngày đăng</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.data.data
                                .filter((blog) => {
                                    return search.toLowerCase() === ''
                                        ? blog
                                        : blog.title.toLowerCase().includes(search.toLowerCase());
                                })
                                .map((blog, index) => (
                                    <tr>
                                        <td>{index}</td>
                                        <td className={cx('content-fix')}>{blog.title}</td>
                                        <td className={cx('content-fix')}>{blog.content}</td>
                                        <td>
                                            <img
                                                src={'http://localhost:8000/api/blogImages/' + blog.image}
                                                style={{ width: '50px', height: '50px' }}
                                                alt="blog"
                                            />
                                        </td>
                                        <td>{blog.author}</td>
                                        <td>{blog.createAt}</td>

                                        <td>
                                            {/* <Link to={`/edit`}> */}
                                            {/* <button className="btn btn-primary" style={{ 'margin-right': '10px' }}>
                                                Sửa
                                            </button> */}
                                            <UpdateComponent
                                                id={blog._id}
                                                title={blog.title}
                                                content={blog.content}
                                                author={blog.author}
                                                createAt={blog.createAt}
                                                style={{ fontSize: '16px' }}
                                            />
                                            {/* </Link> */}
                                            <button
                                                style={{ marginLeft: '5px', fontSize: '16px' }}
                                                id={blog._id}
                                                onClick={(e) => deleteBlog(blog._id, e)}
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

export default Blog;
