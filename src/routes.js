import { Navigate, Outlet, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/product/Products';
import Blog from './pages/blog/Blog';
import User from './pages/user/User';
import NotFound from './pages/Page404';
import CreateProduct from './pages/product/Create';
import CreateBlog from './pages/blog/Create';
import EditProduct from './pages/product/Edit';
import CreateCategory from './pages/category/Create';
import { useAuth } from './hook/auth';
import Categories from './pages/category/Categories';
import EditCategory from './pages/category/Edit';
import Order from './pages/order/Order';
import DetailOrder from './pages/order/Detail';
import DetailUser from './pages/user/Detail';
import CreateUser from './pages/user/Create';
import EditUser from './pages/user/Edit';

// ----------------------------------------------------------------------

export default function Router() {
  const isAuth = useAuth();

  return useRoutes([
    {
      path: '/dashboard',
      element: isAuth ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        {
          path: 'users',
          element: <Outlet />,
          children: [
            { path: '/dashboard/users', element: <User /> },
            { path: '/dashboard/users/:id', element: <DetailUser /> },
            { path: '/dashboard/users/create', element: <CreateUser /> },
            { path: '/dashboard/users/edit/:id', element: <EditUser /> }
          ]
        },
        {
          path: 'orders',
          element: <Outlet />,
          children: [
            { path: '/dashboard/orders', element: <Order /> },
            { path: '/dashboard/orders/:id', element: <DetailOrder /> }
          ]
        },
        { path: 'blog', element: <Blog /> },
        {
          path: 'blog',
          element: <Outlet />,
          children: [
            { path: '/dashboard/blog', element: <Blog /> },
            { path: '/dashboard/blog/create', element: <CreateBlog /> }
          ]
        },
        {
          path: 'products',
          element: <Outlet />,
          children: [
            { path: '/dashboard/products', element: <Products /> },
            { path: '/dashboard/products/:id', element: <EditProduct /> },
            { path: '/dashboard/products/create', element: <CreateProduct /> }
          ]
        },
        {
          path: 'category',
          element: <Outlet />,
          children: [
            { path: '/dashboard/category', element: <Categories /> },
            { path: '/dashboard/category/:id', element: <EditCategory /> },
            { path: '/dashboard/category/create', element: <CreateCategory /> }
          ]
        }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: isAuth ? <Navigate to="/dashboard" /> : <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
