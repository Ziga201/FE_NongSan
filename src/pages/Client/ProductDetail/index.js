import style from './ProductDetail.module.scss';
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import postService from '~/services/postService';
import { faCircleCheck, faMedal, faSmile } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);
function ProductDetail() {
    // const { id } = useParams();
    // const [post, setPost] = useState({});
    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:8000/api/get-post/${id}`)
    //         .then((response) => {
    //             console.log(response.data.data);
    //             setPost(response.data.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, [id]);
    // console.log(post);

    const { id } = useParams();
    const [post, setPost] = useState({});

    const fetchPosts = async () => {
        setPost((await postService.getPostById(id)).data.data);
    };

    useEffect(() => {
        fetchPosts();
    }, [id]);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('row')}>
                    <div className={cx('col-md-6')}>
                        <div className={cx('image')}>
                            <img src={'http://localhost:8000/api/postImages/' + post.image} alt="product" />
                        </div>
                    </div>
                    <div className={cx('info', 'col-md-6')}>
                        <div className={cx('stocking')}>Còn hàng</div>
                        <div className={cx('name')}>{post.name}</div>
                        <div className={cx('price')}>{parseInt(post.price).toLocaleString('vi-VN')} VND</div>
                        <div className={cx('message')}>
                            <FontAwesomeIcon icon={faMedal} />
                            <span>
                                Sản phẩm tươi ngon không chỉ đảm bảo sức khỏe mà còn mang lại trải nghiệm ẩm thực tuyệt
                                vời cho người dùng, sử dụng các sản phẩm tươi ngon trong chế độ ăn uống để duy trì một
                                lối sống lành mạnh.
                            </span>
                        </div>
                        <div className={cx('category')}>
                            Danh mục: <span>{post.category}</span>
                        </div>
                        {/* <div className={cx('desc')}>{post.data.desc}</div> */}
                        <div className={cx('add')}>
                            <button className={cx('add-btn')}>Thêm giỏ hàng</button>
                        </div>
                        <div className={cx('certify')}>
                            <div className={cx('certify-item')}>
                                <FontAwesomeIcon icon={faCircleCheck} /> Chứng nhận vệ sinh an toàn thực phẩm (VSATTP)
                            </div>
                            <div className={cx('certify-item')}>
                                <FontAwesomeIcon icon={faCircleCheck} /> Sử dụng 100% phân bón hữu cơ
                            </div>
                            <div className={cx('certify-item')}>
                                <FontAwesomeIcon icon={faCircleCheck} /> Nguồn gốc nhập khẩu rõ ràng
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('desc')}>
                    <div className={cx('heading')}>Mô tả</div>
                    <div className={cx('desc-text')}>{post.desc}</div>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
