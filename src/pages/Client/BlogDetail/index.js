import style from './BlogDetail.module.scss';
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import blogService from '~/services/blogService';
import { faCalendarDays, faComments, faUser, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);
function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState({});

    const fetchBlogs = async () => {
        setBlog((await blogService.getBlogById(id)).data.data);
    };
    console.log(blog);

    useEffect(() => {
        fetchBlogs();
    }, [id]);

    return (
        <>
            <div className={cx('path')}>
                <span>
                    <Link to="/">
                        Home <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                    <Link to="/blog">
                        Tin tức <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                </span>
                {blog.title}
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('row')}>
                    <div className={cx('col-md-9')}>
                        <div className={cx('tag')}>
                            <span>Nông trại</span>
                            <span>Đời sống</span>
                        </div>
                        <div className={cx('title')}>{blog.title}</div>
                        <div className={cx('info')}>
                            <FontAwesomeIcon icon={faCalendarDays} /> {blog.createAt} /{' '}
                            <FontAwesomeIcon icon={faUser} /> bởi admin / <FontAwesomeIcon icon={faComments} /> 6
                        </div>
                        <div className={cx('image')}>
                            <img src={'http://localhost:8000/api/blogImages/' + blog.image} alt="blog" />
                        </div>
                        <p className={cx('content')}>{blog.content}</p>
                    </div>
                    <div className={cx('col-md-3')}>
                        <div className={cx('categories')}>
                            <div className={cx('categories-title')}>Danh mục</div>

                            <div className={cx('item')}>
                                <FontAwesomeIcon icon={faAngleRight} className={cx('item-icon')} />
                                <div className={cx('item-text')}>Đời sống & con người</div>
                            </div>
                            <div className={cx('item')}>
                                <FontAwesomeIcon icon={faAngleRight} className={cx('item-icon')} />
                                <div className={cx('item-text')}>Thị trường nông sản</div>
                            </div>
                            <div className={cx('item')}>
                                <FontAwesomeIcon icon={faAngleRight} className={cx('item-icon')} />
                                <div className={cx('item-text')}>Chế độ sức khoẻ</div>
                            </div>
                            <div className={cx('item')}>
                                <FontAwesomeIcon icon={faAngleRight} className={cx('item-icon')} />
                                <div className={cx('item-text')}>Nhà cung cấp thực phẩm</div>
                            </div>
                            <div className={cx('item')}>
                                <FontAwesomeIcon icon={faAngleRight} className={cx('item-icon')} />
                                <div className={cx('item-text')}>Văn hoá kinh tế</div>
                            </div>
                            <div className={cx('item')}>
                                <FontAwesomeIcon icon={faAngleRight} className={cx('item-icon')} />
                                <div className={cx('item-text')}>Rau củ quả tươi ngon</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogDetail;
