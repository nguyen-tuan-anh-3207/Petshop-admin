import { Button } from '@mui/material';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ORDER_STATUS } from '../../constants';
import { useUpdateSearch } from 'src/hook/useSearchParams';
import { useLoadPagingOrdersQuery } from 'src/reducers/order/api';
import CustomTable from '../../components/Table';
import { datetime, stringExtension } from '../../extensions';

export default function OrderList() {
  const { search, pathname } = useLocation();

  const navigate = useNavigate();

  const { handleChangePageSize } = useUpdateSearch(pathname, search);

  const { data } = useLoadPagingOrdersQuery(search);

  const { orders, total } = data ?? {};

  const columns = [
    { id: 'code', label: 'Mã đơn hàng' },
    {
      id: 'phoneNumber',
      label: 'Số điện thoại',
      render: (value) => value ?? '-'
    },
    {
      id: 'address',
      label: 'Địa chỉ',
      render: (value) => value ?? '-'
    },
    {
      id: 'createdAt',
      label: 'Ngày tạo đơn',
      render: (value) => datetime.formatDateTime(value)
    },
    {
      id: 'status',
      label: 'Trạng thái',
      render: (value) => stringExtension.getLabel(value)
    },
    {
      id: 'total',
      label: 'Tổng tiền',
      render: (value) => (value ? value.toLocaleString('en-US') : '-')
    },
    {
      id: '',
      label: 'Hành động',
      action: (id) => {
        return <Button onClick={() => navigate(`/dashboard/orders/${id}`)}>Xem</Button>;
      }
    }
  ];

  return (
    <CustomTable
      title={'Danh sách đơn hàng'}
      data={orders}
      total={total}
      columns={columns}
      handleChangePageSize={handleChangePageSize}
      pagination={true}
    />
  );
}
