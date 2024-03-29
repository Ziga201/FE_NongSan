// Layouts
import { AdminLayout } from '~/components/Layout';
// Client
import Home from '~/pages/Client/Home';
import Contact from '~/pages/Client/Contact';
import Blog from '~/pages/Client/Blog';
import BlogFilter from '~/pages/Client/Blog/BlogFilter';
import BlogDetail from '~/pages/Client/BlogDetail';
import Product from '~/pages/Client/Product';
import ProductDetail from '~/pages/Client/ProductDetail';
import Cart from '~/pages/Client/Cart';
import Login from '~/pages/Client/Login';
import Signup from '~/pages/Client/Signup';
import Checkout from '~/pages/Client/Checkout';
import Confirm from '~/pages/Client/Confirm';
import Order from '~/pages/Client/Order';
import Account from '~/pages/Client/Account';
import Staff from '~/pages/Client/Staff';
import ForgotPassword from '~/pages/Client/ForgotPassword';

// Admin
import _Home from '~/pages/Admin/Home';
import _Account from '~/pages/Admin/Account';
import _Blog from '~/pages/Admin/Blog';
import _Product from '~/pages/Admin/Product';
import _ProductType from '~/pages/Admin/ProductType';
import _Checkout from '~/pages/Admin/Checkout';
import _Message from '~/pages/Admin/Message';

const publicRoutes = [
    // Client
    { path: '/', component: Home },
    { path: '/contact', component: Contact },
    { path: '/blog', component: Blog },
    { path: '/blog/blogfilter/:id', component: BlogFilter },
    { path: '/blog/:id', component: BlogDetail },
    { path: '/product', component: Product },
    { path: '/product/:id', component: ProductDetail },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/staff', component: Staff },
    { path: '/account', component: Account },
    { path: '/forgotpassword', component: ForgotPassword },

    // { path: '/order', component: Order },
    // { path: '/checkout', component: Checkout },
    // { path: '/confirm', component: Confirm },
    // { path: '/cart', component: Cart },
    // { path: '/account', component: Account },

    // Admin
];

const privateRoutes = [
    { path: '/order', component: Order },
    { path: '/checkout', component: Checkout },
    { path: '/confirm', component: Confirm },
    { path: '/cart', component: Cart },
];

const adminRoutes = [
    { path: '/admin/', component: _Home, layout: AdminLayout },
    { path: '/admin/account', component: _Account, layout: AdminLayout },
    { path: '/admin/blog', component: _Blog, layout: AdminLayout },
    { path: '/admin/product', component: _Product, layout: AdminLayout },
    { path: '/admin/producttype', component: _ProductType, layout: AdminLayout },
    { path: '/admin/checkout', component: _Checkout, layout: AdminLayout },
    { path: '/admin/message', component: _Message, layout: AdminLayout },
];

export { publicRoutes, privateRoutes, adminRoutes };
