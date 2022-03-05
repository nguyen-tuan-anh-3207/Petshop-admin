import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useUpdateSearch } from 'src/hook/useSearchParams';
import { useLoadPagingOrdersQuery } from 'src/reducers/order/api';
import CustomTable from '../../components/Table';
import { datetime } from '../../extensions';

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
    id: 'total',
    label: 'Tổng tiền',
    render: (value) => value.toLocaleString('en-US')
  },
];

export default function OrderList() {

  const { search, pathname } = useLocation()

  const { handleChangePageSize } = useUpdateSearch(pathname, search)

  const { data } = useLoadPagingOrdersQuery(search)

  const { orders, total } = data ?? {}

  return (
    <CustomTable
      title={'Danh sách đơn hàng'}
      data={orders}
      total={total}
      columns={columns}
      handleChangePageSize={handleChangePageSize} />
  );
}
