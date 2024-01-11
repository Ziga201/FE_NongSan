import style from '~/pages/Client/Blog/Blog.module.scss';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCalendarDays, faComments, faUser } from '@fortawesome/free-solid-svg-icons';
import blogService from '~/services/blogService';

const cx = classNames.bind(style);

function BlogFilter() {
    const [data, setData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const response = await blogService.getAllByBlogTypeID(id);
            setData(response);
        };
        fetchData();
    }, []);

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
                                        <FontAwesomeIcon icon={faComments} />
                                    </div>
                                    <div className={cx('title')}>{blog.title}</div>
                                    <div className={cx('desc')}>{blog.content}</div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default BlogFilter;
