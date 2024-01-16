import style from './Blog.module.scss';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCalendarDays, faComments, faEye, faUser } from '@fortawesome/free-solid-svg-icons';
import blogService from '~/services/blogService';
import Pagination from '@mui/material/Pagination';
const cx = classNames.bind(style);

function Blog() {
    const [data, setData] = useState({});
    const [pageNumber, setPageNumber] = useState({
        pageNumber: 1,
        pageSize: 6,
    });
    const [update, setUpdate] = useState('');
    const [totalPages, setTotalPages] = useState();
    const handlePageClick = (event, value) => {
        setPageNumber({ pageNumber: value, pageSize: 6 });
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await blogService.getAll(pageNumber.pageSize, pageNumber.pageNumber);
            setData(response.data);
            setTotalPages(response.data.pagination.totalPage);
        };
        fetchData();
    }, [pageNumber]);

    return (
        <>
            <div className={cx('banner')}>
                <div className={cx('wrapper')}>
                    <div className={cx('heading')}>Tin tức</div>
                    <div className={cx('path')}>
                        <Link to="/" className={cx('link')}>
                            Trang chủ
                        </Link>
                        <FontAwesomeIcon style={{ margin: '0 5px' }} icon={faAngleRight} />
                        <span className={cx('page')}>Tin tức</span>
                    </div>
                </div>
            </div>

            <div className={cx('content')}>
                <div className={cx('wrapper')}>
                    {data.data !== undefined && data.data.length > 0 && (
                        <div className={cx('row')}>
                            {data.data.map((blog) => (
                                <Link to={`/blog/${blog.blogID}`} key={blog.blogID} className={cx('item', 'col-md-4')}>
                                    <div className={cx('image')}>
                                        <img src={blog.image} alt="blog" />
                                    </div>
                                    <div className={cx('info')}>
                                        <FontAwesomeIcon icon={faCalendarDays} /> {blog.createdAt} /{' '}
                                        <FontAwesomeIcon icon={faUser} /> bởi {blog.fullName} /{' '}
                                        <FontAwesomeIcon icon={faEye} /> {blog.view}
                                    </div>
                                    <div className={cx('title')}>{blog.title}</div>
                                    <div className={cx('desc')}>{blog.content}</div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div style={{ display: 'flex', margin: '20px 0 20px', justifyContent: 'center' }}>
                <Pagination count={totalPages} onChange={handlePageClick} color="success" />
            </div>
        </>
    );
}

export default Blog;
