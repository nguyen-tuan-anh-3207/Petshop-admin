import { Divider, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import CustomTable from '../../components/Table';
import { useLoadOrdersQuery } from 'src/reducers/order/api';

const Detail = () => {

    const { id } = useParams()

    const { data } = useLoadOrdersQuery(id)

    const { order } = data ?? {}

    const columns = [
        {
            id: 'product',
            label: 'Tên sản phẩm',
            render: (value) => value?.name ?? '-'
        },
        {
            id: 'category',
            label: 'Danh mục',
            render: (value) => value?.name ?? '-'
        },
        {
            id: 'product',
            label: 'Đơn giá',
            render: (value) => value?.price ? value.price.toLocaleString('en-US') : '-'
        },
        {
            id: 'productQuantity',
            label: 'Số lượng',
            render: (value) => value ?? '-'
        },
        {
            id: 'subTotal',
            label: 'Thành tiền',
            render: (value) => value ? value.toLocaleString('en-US') : '-'
        },
    ];

    return (
        <React.Fragment>
            <Typography gutterBottom variant="h4" component="div">
                Chi tiết đơn hàng
            </Typography>

            <Divider />

            {!!order && (
                <React.Fragment>
                    <Typography gutterBottom variant="h6" component="div" style={{ marginTop: '1.2rem' }}>
                        Thông tin khách hàng
                    </Typography>
                    <Typography gutterBottom variant="5" component="p">
                        Mã đơn hàng: {' '}
                        <Typography gutterBottom variant="5" component="span" style={{ fontWeight: 'bold' }}>
                            {order?.code}
                        </Typography>
                    </Typography>
                    <Typography gutterBottom variant="5" component="p">
                        Tên đăng nhập: {' '}
                        <Typography gutterBottom variant="5" component="span" style={{ fontWeight: 'bold' }}>
                            {order?.customer?.username}
                        </Typography>
                    </Typography>
                    <Typography gutterBottom variant="5" component="p">
                        Địa chỉ: {' '}
                        <Typography gutterBottom variant="5" component="span" style={{ fontWeight: 'bold' }}>
                            {order?.address}
                        </Typography>
                    </Typography>
                    <Typography gutterBottom variant="5" component="p">
                        Số điện thoại: {' '}
                        <Typography gutterBottom variant="5" component="span" style={{ fontWeight: 'bold' }}>
                            {order?.phoneNumber}
                        </Typography>
                    </Typography>
                    <Typography gutterBottom variant="5" component="p">
                        Email: {' '}
                        <Typography gutterBottom variant="5" component="span" style={{ fontWeight: 'bold' }}>
                            {order?.customer.email}
                        </Typography>
                    </Typography>

                    <Divider />

                    <CustomTable
                        title={'Thông tin sản phẩm'}
                        data={order?.details}
                        columns={columns}
                        pagination={false}
                    />
                    <Typography gutterBottom variant="5" component="div" style={{ width: '100%', marginTop: '1rem' }}>
                        Tổng tiền: {' '}
                        <Typography gutterBottom variant="5" component="span" style={{ fontWeight: 'bold' }}>
                            {order?.total.toLocaleString('en-US')}
                        </Typography>
                    </Typography>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default Detail