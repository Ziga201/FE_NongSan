import style from './ProductDetail.module.scss';
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import productService from '~/services/productService';
import cartService from '~/services/cartService';
import { faCircleCheck, faMedal } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
const cx = classNames.bind(style);
function ProductDetail() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [account, setAccount] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const jwtToken = localStorage.getItem('jwtToken');
            if (jwtToken) {
                try {
                    const response = await jwtDecode(jwtToken);
                    if (response) {
                        setAccount(response);
                    }
                } catch (error) {
                    console.error('Error decoding JWT:', error);
                }
            }
        };

        fetch();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const response = await productService.getProductByID(id);
            setData(response.data.data);
        };
        fetchData();
    }, []);

    const addToCart = async (item) => {
        const formData = new FormData();

        formData.append('accountID', account.Id);
        formData.append('productID', item);

        const response = await cartService.addToCart(formData);
        toast.success(response.data.message);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('row')}>
                    <div className={cx('col-md-6')}>
                        <div className={cx('image')}>
                            <img src={data.avatarImageProduct} alt="product" />
                        </div>
                    </div>
                    <div className={cx('info', 'col-md-6')}>
                        <div className={cx('stocking')}>Còn hàng</div>
                        <div className={cx('name')}>{data.nameProduct}</div>
                        <div className={cx('price')}>{parseInt(data.price).toLocaleString('vi-VN')} VND</div>
                        <div className={cx('message')}>
                            <FontAwesomeIcon icon={faMedal} />
                            <span>
                                Sản phẩm tươi ngon không chỉ đảm bảo sức khỏe mà còn mang lại trải nghiệm ẩm thực tuyệt
                                vời cho người dùng, sử dụng các sản phẩm tươi ngon trong chế độ ăn uống để duy trì một
                                lối sống lành mạnh.
                            </span>
                        </div>
                        <div className={cx('category')}>
                            Danh mục: <span>{data.nameProductType}</span>
                        </div>
                        <div className={cx('add')}>
                            <button onClick={() => addToCart(data.productID)} className={cx('add-btn')}>
                                Thêm giỏ hàng
                            </button>
                            <ToastContainer position="bottom-right" />
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
                    {/* <div className={cx('desc-text')}>{data.desc}</div> */}
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
