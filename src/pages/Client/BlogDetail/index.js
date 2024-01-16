import style from './BlogDetail.module.scss';
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import blogService from '~/services/blogService';
import blogTypeService from '~/services/blogTypeService';
import { faCalendarDays, faComments, faUser, faAngleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
const cx = classNames.bind(style);
function BlogDetail() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [typeData, setTypeData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await blogService.getBlogById(id);
            const updateView = blogService.updateView(id);
            setData(response.data.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await blogTypeService.getAll();
            setTypeData(response);
        };
        fetchData();
    }, []);
    const formatDate = (date) => {
        const dateObject = new Date(date);

        const formattedDate = format(dateObject, 'HH:mm dd-MM-yyyy');
        return formattedDate;
    };
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
                {data.title}
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('row')}>
                    <div className={cx('col-md-9')}>
                        <div className={cx('tag')}>
                            <span>Nông trại</span>
                            <span>Đời sống</span>
                        </div>
                        <div className={cx('title')}>{data.title}</div>
                        <div className={cx('info')}>
                            <FontAwesomeIcon icon={faCalendarDays} /> {formatDate(data.createAt ?? 1)} /{' '}
                            <FontAwesomeIcon icon={faUser} /> bởi {data.fullName} / <FontAwesomeIcon icon={faEye} />{' '}
                            {data.view}
                        </div>
                        <div className={cx('image')}>
                            <img src={data.image} alt="blog" />
                        </div>
                        <p className={cx('content')}>{data.content}</p>
                    </div>
                    <div className={cx('col-md-3')}>
                        <div className={cx('categories')}>
                            <div className={cx('categories-title')}>Danh mục</div>
                            {typeData.data !== undefined && typeData.data.length > 0 && (
                                <div>
                                    {typeData.data.map((item, index) => (
                                        <div className={cx('item')}>
                                            <Link to={`/blog/blogfilter/${item.blogTypeID}`}>
                                                <FontAwesomeIcon icon={faAngleRight} className={cx('item-icon')} />
                                                <span className={cx('item-text')}>{item.blogTypeName}</span>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogDetail;
