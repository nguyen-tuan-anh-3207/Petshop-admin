import { LoadingButton } from '@mui/lab';
import { Divider, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomTable from 'src/components/Table';
import { stringExtension } from 'src/extensions';
import { ORDER_STATUS } from '../../constants';
import { useLoadOrdersQuery, useUpdateOrdersMutation } from 'src/reducers/order/api';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useLoadOrdersQuery(id);
  const [onUpdate, { error, isSuccess, isSubmitting }] = useUpdateOrdersMutation();

  const { order } = data ?? {};

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
      render: (value) => (value?.price ? value.price.toLocaleString('en-US') : '-')
    },
    {
      id: 'productQuantity',
      label: 'Số lượng',
      render: (value) => value ?? '-'
    },
    {
      id: 'subTotal',
      label: 'Thành tiền',
      render: (value) => (value ? value.toLocaleString('en-US') : '-')
    }
  ];

  const handleUpdate = () => {
    onUpdate({
      orderId: id,
      status: ORDER_STATUS.DELIVERED
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard/orders');
    }
  });

  return (
    <React.Fragment>
      <Typography gutterBottom variant="h4" component="div">
        Chi tiết đơn hàng
      </Typography>

      <Divider />

      {!!order && (
        <Grid container spacing={2} style={{ marginTop: '1.5rem' }}>
          <Grid item xs={4}>
            <Typography gutterBottom variant="h6" component="div">
              Thông tin đơn hàng
            </Typography>
            <Typography gutterBottom variant="5" component="p">
              Mã đơn hàng:{' '}
              <Typography gutterBottom variant="5" component="span" style={{ fontWeight: 'bold' }}>
                {order?.code}
              </Typography>
            </Typography>
            <Typography gutterBottom variant="5" component="p">
              Trạng thái đơn hàng:{' '}
              <Typography gutterBottom variant="5" component="span" style={{ fontWeight: 'bold' }}>
                {stringExtension.getLabel(order?.status)}
              </Typography>
            </Typography>
            <Typography gutterBottom variant="5" component="p">
              Địa chỉ:{' '}
              <Typography gutterBottom variant="5" component="span" style={{ fontWeight: 'bold' }}>
                {order?.address}
              </Typography>
            </Typography>
            <Typography gutterBottom variant="5" component="p">
              Số điện thoại:{' '}
              <Typography gutterBottom variant="5" component="span" style={{ fontWeight: 'bold' }}>
                {order?.phoneNumber}
              </Typography>
            </Typography>
            <Typography gutterBottom variant="5" component="p">
              Email:{' '}
              <Typography gutterBottom variant="5" component="span" style={{ fontWeight: 'bold' }}>
                {order?.customer.email}
              </Typography>
            </Typography>
            {/* update order Status */}
            {(!order?.status || order?.status === ORDER_STATUS.PLACED) && (
              <LoadingButton
                size="large"
                type="button"
                onClick={handleUpdate}
                variant="contained"
                loading={isSubmitting}
              >
                Vận chuyển
              </LoadingButton>
            )}
          </Grid>
          <Grid item xs={8}>
            <CustomTable
              title={'Thông tin sản phẩm'}
              data={order?.details}
              columns={columns}
              pagination={false}
            />
            <Typography
              gutterBottom
              variant="5"
              component="div"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Tổng tiền:{' '}
              <Typography gutterBottom variant="5" component="span" style={{ fontWeight: 'bold' }}>
                {order?.total.toLocaleString('en-US')}
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Detail;
