import { Navigate, Outlet, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/product/Products';
import Blog from './pages/Blog';
import User from './pages/user/User';
import NotFound from './pages/Page404';
import CreateProduct from './pages/product/Create';

// ----------------------------------------------------------------------

export default function Router() {
  const isAuth = false;
  return useRoutes([
    {
      path: '/dashboard',
      element: isAuth ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'category', element: <Products /> },
        // { path: 'products', element: <Products /> },
        { path: 'order', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        {
          path: 'products',
          element: <Outlet />,
          children: [
            { path: '/dashboard/products', element: <Products /> },
            { path: '/dashboard/products/create', element: <CreateProduct /> }
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
