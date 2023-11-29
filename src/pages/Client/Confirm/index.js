import { Link } from 'react-router-dom';

function Confirm() {
    return (
        <div style={{ textAlign: 'center' }}>
            <img src="https://shopta.vn/images/2015/11/dat-hang-thanh-cong.jpg" />
            <div style={{ marginBottom: '50px' }}>
                <Link to="/">
                    <button className="btn btn-success">Tiếp tục mua hàng</button>
                </Link>
            </div>
        </div>
    );
}

export default Confirm;
