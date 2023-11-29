// Layouts
import { AdminLayout } from '~/components/Layout';
// Client
import Home from '~/pages/Client/Home';
import Contact from '~/pages/Client/Contact';
import Blog from '~/pages/Client/Blog';
import BlogDetail from '~/pages/Client/BlogDetail';
import Product from '~/pages/Client/Product';
import ProductDetail from '~/pages/Client/ProductDetail';
import Staff from '~/pages/Client/Staff';
import Cart from '~/pages/Client/Cart';
import Login from '~/pages/Client/Login';
import Signup from '~/pages/Client/Signup';
import Checkout from '~/pages/Client/Checkout';
import Confirm from '~/pages/Client/Confirm';
import Order from '~/pages/Client/Order';
import Account from '~/pages/Client/Account';

// Admin
import _Home from '~/pages/Admin/Home';
import _Account from '~/pages/Admin/Account';
import _Blog from '~/pages/Admin/Blog';
import _Product from '~/pages/Admin/Product';
import _Checkout from '~/pages/Admin/Checkout';
import _Staff from '~/pages/Admin/Staff';
import _Message from '~/pages/Admin/Message';

const publicRoutes = [
    // Client
    { path: '/', component: Home },
    { path: '/contact', component: Contact },
    { path: '/blog', component: Blog },
    { path: '/blog/:id', component: BlogDetail },
    { path: '/product', component: Product },
    { path: '/product/:id', component: ProductDetail },
    { path: '/staff', component: Staff },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },

    // Admin
];

const privateRoutes = [
    { path: '/order', component: Order },
    { path: '/checkout', component: Checkout },
    { path: '/confirm', component: Confirm },
    { path: '/cart', component: Cart },
    { path: '/account', component: Account },
];

const adminRoutes = [
    { path: '/admin/', component: _Home, layout: AdminLayout },
    { path: '/admin/account', component: _Account, layout: AdminLayout },
    { path: '/admin/blog', component: _Blog, layout: AdminLayout },
    { path: '/admin/staff', component: _Staff, layout: AdminLayout },
    { path: '/admin/product', component: _Product, layout: AdminLayout },
    { path: '/admin/checkout', component: _Checkout, layout: AdminLayout },
    { path: '/admin/message', component: _Message, layout: AdminLayout },
];

export { publicRoutes, privateRoutes, adminRoutes };
