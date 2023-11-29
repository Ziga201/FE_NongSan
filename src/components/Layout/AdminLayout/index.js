import Header from './Header';
import Sidebar from './Sidebar';

function AdminLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="" style={{ display: 'flex' }}>
                <Sidebar />
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;
