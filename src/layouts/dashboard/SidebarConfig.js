import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import briefcaseFill from '@iconify/icons-eva/briefcase-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Trang chủ',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Đơn hàng',
    path: '/dashboard/orders',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'Người dùng',
    path: '/dashboard/users',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Sản phẩm',
    path: '/dashboard/products',
    icon: getIcon(briefcaseFill)
  },
  {
    title: 'loại sản phẩm',
    path: '/dashboard/category',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon(fileTextFill)
  }
];

export default sidebarConfig;
