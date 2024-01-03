import { Link } from 'react-router-dom';
import confirm from '~/assets/images/confirm.jpg';

function Confirm() {
    return (
        <div style={{ textAlign: 'center' }}>
            <img src={confirm} />
            <div style={{ marginBottom: '50px' }}>
                <Link to="/">
                    <button className="btn btn-success">Tiếp tục mua hàng</button>
                </Link>
            </div>
        </div>
    );
}

export default Confirm;
