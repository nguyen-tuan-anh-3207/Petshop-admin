import * as React from 'react';
import { useLoadPagingOrdersQuery } from 'src/reducers/order/api';
import CustomTable from '../../components/Table';
import { datetime } from '../../extensions';

const columns = [
  { id: 'code', label: 'Mã đơn hàng' },
  {
    id: 'customer',
    label: 'Số điện thoại',
    render: (value) => value?.phoneNumber ?? '-'
  },
  {
    id: 'address',
    label: 'Địa chỉ',
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
  const { data, isLoading, error } = useLoadPagingOrdersQuery()
  const { orders, total } = data ?? {}
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  console.log('orders...', orders)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <CustomTable title={'Danh sách đơn hàng'} data={orders} total={total} columns={columns} />
  );
}
