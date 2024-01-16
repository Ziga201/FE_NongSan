import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import style from '~/pages/Admin/Page.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import blogService from '~/services/blogService';
import CreateComponent from './Create/CreateComponent';
import UpdateComponent from './Update/UpdateComponent';
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '@mui/material/Pagination';

const cx = classNames.bind(style);

function Blog() {
    const [data, setData] = useState({});
    const [update, setUpdate] = useState('');
    const [pageNumber, setPageNumber] = useState({
        pageNumber: 1,
        pageSize: 6,
    });
    const [totalPages, setTotalPages] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const response = await blogService.getAll(pageNumber.pageSize, pageNumber.pageNumber);
            setTotalPages(response.data.pagination.totalPage);
            setData(response.data);
        };
        fetchData();
    }, [update]);
    const formatDate = (date) => {
        const dateObject = new Date(date);
        const formattedDate = format(dateObject, 'HH:mm dd-MM-yyyy');
        return formattedDate;
    };
    const handlePageClick = (event, value) => {
        setPageNumber({ pageNumber: value, pageSize: 6 });
        setUpdate(new Date());
    };
    const deleteBlog = async (id, e) => {
        var response = await blogService.delete(id);
        setUpdate(new Date());
        toast.success(response.data.message);
    };
    const [search, setSearch] = useState('');

    return (
        <div className={cx('hug')}>
            <div className={cx('heading')}>
                <div className={cx('search')}>
                    <input
                        type="text"
                        className={cx('search-input')}
                        placeholder="Nhập tài khoản ..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                </div>
                <ToastContainer position="bottom-right" />
                <CreateComponent setUpdate={setUpdate} />
            </div>

            {data.data !== undefined && data.data.length > 0 && (
                <div className={cx('wrapper')}>
                    <table className={cx('table')} style={{ textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Loại bài viết</th>
                                <th>Tiêu đề</th>
                                <th>Nội dung</th>
                                <th>Ảnh</th>
                                <th>Tác giả</th>
                                <th>Ngày đăng</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data
                                .filter((blog) => {
                                    return search.toLowerCase() === ''
                                        ? blog
                                        : blog.title.toLowerCase().includes(search.toLowerCase());
                                })
                                .map((blog, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{blog.blogTypeName}</td>
                                        <td>{blog.title}</td>
                                        <td>{blog.content}</td>
                                        <td>
                                            <img
                                                src={blog.image}
                                                style={{ width: '50px', height: '50px' }}
                                                alt="blog"
                                            />
                                        </td>
                                        <td>{blog.fullName}</td>
                                        <td>{formatDate(blog.createAt)}</td>

                                        <td>
                                            <UpdateComponent
                                                id={blog.blogID}
                                                blogTypeID={blog.blogTypeID}
                                                accountID={blog.accountID}
                                                title={blog.title}
                                                content={blog.content}
                                                image={blog.image}
                                                createAt={blog.createAt}
                                                setUpdate={setUpdate}
                                                style={{ fontSize: '16px' }}
                                            />
                                            <button
                                                style={{ marginLeft: '5px', fontSize: '16px' }}
                                                onClick={(e) => deleteBlog(blog.blogID, e)}
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
            <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                <Pagination count={totalPages} onChange={handlePageClick} color="primary" />
            </div>
        </div>
    );
}

export default Blog;
