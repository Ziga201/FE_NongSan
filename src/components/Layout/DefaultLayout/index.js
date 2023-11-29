import classNames from 'classnames/bind';

import Header from './Header';
import Footer from './Footer';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('content')}>
                <div style={{ marginTop: '150px' }}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
