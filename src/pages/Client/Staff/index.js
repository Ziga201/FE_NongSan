import style from './Staff.module.scss';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faHandsHoldingCircle } from '@fortawesome/free-solid-svg-icons';
import brand7 from '~/assets/images/brand7.svg';
import { Slide } from 'react-slideshow-image';
import '../../../../node_modules/react-slideshow-image/dist/styles.css';
import staffService from '~/services/staffService';
const cx = classNames.bind(style);

function Staff() {
    const [staffs, setStaffs] = useState({});

    const fetchStaffs = async () => {
        setStaffs(await staffService.getStaffs());
    };

    useEffect(() => {
        fetchStaffs();
    }, []);
    return (
        <>
            <div className={cx('banner')}>
                <div className={cx('wrapper')}>
                    <div className={cx('heading')}>Đội ngũ</div>
                    <div className={cx('path')}>
                        <Link to="/" className={cx('link')}>
                            Trang chủ
                        </Link>
                        <FontAwesomeIcon style={{ margin: '0 5px' }} icon={faAngleRight} />
                        <span className={cx('page')}>Đội ngũ</span>
                    </div>
                </div>
            </div>

            <div className={cx('content')}>
                <div className={cx('wrapper')}>
                    <div className={cx('image')}>
                        <img src="https://demo2wpopal.b-cdn.net/freshio/wp-content/uploads/2020/08/icon1-h8.jpg" />
                    </div>
                    <div className={cx('intro')}>
                        <div className={cx('row')}>
                            <div className={cx('intro-item col-md-4')}>
                                <div className={cx('intro-img')}>
                                    <img src="https://hnd.bacninh.gov.vn/documents/7434684/7532505/CH1.jpg/990f8ad5-37ef-4ce6-3c26-9d0990df07d4?t=1654047842977" />
                                </div>
                                <div className={cx('intro-title')}>Chúng ta là ai</div>
                                <div className={cx('intro-desc')}>
                                    Chúng tôi là đơn vị hàng đầu cung cấp thực phẩm sạch tại Việt Nam, với kinh nghiệm
                                    phục vụ khách hàng khó tính, đảm bảo tiếng nói chung với khách hàng về cung cấp hàng
                                    hóa.
                                </div>
                            </div>
                            <div className={cx('intro-item col-md-4')}>
                                <div className={cx('intro-img')}>
                                    <img src="https://media.thuonghieucongluan.vn/uploads/2021/08/18/tieu-thu-nong-san-1629271953.jpg" />
                                </div>
                                <div className={cx('intro-title')}>Sản phẩm của chúng tôi</div>
                                <div className={cx('intro-desc')}>
                                    Nông sản Dũng Hà luôn kiểm soát chất lượng đầu vào chặt chẽ, liên kết sản xuất và
                                    định hướng bà con nông dân trồng trọt theo phương hướng nông nghiệp bền vững
                                </div>
                            </div>
                            <div className={cx('intro-item col-md-4')}>
                                <div className={cx('intro-img')}>
                                    <img src="https://kinhtenongthon.vn/media/news/8387418ed9ce2d0e0188fced31bb45d4/phuc2_wcnk.jpg" />
                                </div>
                                <div className={cx('intro-title')}>Chúng ta làm việc như thế nào</div>
                                <div className={cx('intro-desc')}>
                                    Chúng tôi tạo ra nguồn nông sản không chỉ đảm bảo về chất lượng mà còn đa dạng về
                                    sản phẩm, tất cả vì sức khoẻ người tiêu dùng.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('quanlity')}>
                        {/* <div className={cx('row')}>
                                <div className={cx('col-md-3')}>
                                    <div className={cx('logo')}>
                                        <div className={cx('logo-icon')}>
                                            <FontAwesomeIcon icon={faHandsHoldingCircle} />
                                            <img src={brand7} alt="brand1" />
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('col-md-6')}></div>
                                <div className={cx('col-md-3')}></div>
                            </div> */}
                    </div>
                </div>
                <div className={cx('feedback')}>
                    <div className={cx('wrapper')}>
                        <Slide>
                            <div className={cx('slide-wrapper')}>
                                <div className={cx('avatar')}>
                                    <img src="https://static-images.vnncdn.net/files/publish/2023/4/13/ronaldo-al-nassr-1156.jpg" />
                                </div>
                                <div className={cx('speech')}>
                                    “Cũng thích việc tôi có thể lấy kim bấm của mình trong các gói giấy màu nâu và hộp
                                    thủy tinh ở khu vực không rác thải, với ý tưởng giảm thiểu nhựa và cũng thuận tiện
                                    hơn.”
                                </div>
                                <div className={cx('name')}>Tùng - Nhà bán hàng</div>
                            </div>
                            <div className={cx('slide-wrapper')}>
                                <div className={cx('avatar')}>
                                    <img src="https://cdn.images.express.co.uk/img/dynamic/67/1200x712/4739506.jpg?r=1683549769896" />
                                </div>
                                <div className={cx('speech')}>
                                    “Tôi thích việc có thể lấy kim bấm của mình từ các gói giấy màu nâu và hộp thủy tinh
                                    trong khu vực không rác thải. Điều này không chỉ giúp giảm thiểu sử dụng nhựa mà còn
                                    tiện lợi hơn.”
                                </div>
                                <div className={cx('name')}>Nhô - Nhà cung cấp</div>
                            </div>
                        </Slide>
                    </div>
                </div>

                <div>
                    <div className={cx('wrapper')}>
                        <div className={cx('text-wrapper')}>
                            <div className={cx('text-editor')}>Đội của chúng tôi</div>
                            <div className={cx('text-heading')}>Chúng tôi là đội tốt nhất</div>
                        </div>
                        <div className={cx('info')}>
                            {staffs.data !== undefined && staffs.data.data.length > 0 && (
                                <div className={cx('row')}>
                                    {staffs.data.data.slice(0, 4).map((staff) => (
                                        <div className={cx('col-md-3')}>
                                            <div className={cx('info-item')}>
                                                <div className={cx('info-img')}>
                                                    <img
                                                        src={'http://localhost:8000/api/staffImages/' + staff.image}
                                                        alt="staff"
                                                    />
                                                </div>
                                                <div className={cx('info-name')}>{staff.name}</div>
                                                <div className={cx('info-position')}>{staff.position}</div>
                                            </div>
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

export default Staff;
