import React, { useState } from 'react'
import CustomTable from 'src/components/Table'
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'src/constants/string';
import { useGetOrdersByUserQuery } from 'src/reducers/order/api'
import { datetime } from '../../extensions';

const OrderCustomer = (props) => {

    const { id } = props

    const [page, setPage] = useState(DEFAULT_PAGE_INDEX)
    const [limit, setLimit] = useState(DEFAULT_PAGE_SIZE)

    const { data } = useGetOrdersByUserQuery({ id, page, limit })

    const { orders, total } = data ?? {}

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
            render: (value) => value ? value.toLocaleString('en-US') : '-'
        },
    ];

    const handleChangePageSize = (page, limit) => {
        setPage(page + 1)
        setLimit(limit)
    }

    return (
        <CustomTable
            data={orders}
            total={total}
            columns={columns}
            handleChangePageSize={handleChangePageSize}
            pagination={true}
        />
    )
}

export default OrderCustomer