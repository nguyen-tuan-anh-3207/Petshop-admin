import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

// material
import { Box, Card, Link, Typography, Stack, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import { useDeleteProductsMutation } from '../../../reducers/product/api';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const { name, image, price, _id } = product;
  const navigate = useNavigate();

  const [onDelete] = useDeleteProductsMutation();

  const handleEdit = () => {
    navigate(`${_id}`);
  };

  const handleDelete = () => {
    onDelete(_id);
  };

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={name} src={image?.url} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={_id} color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <IconButton onClick={handleEdit}>
            <Icon icon="eva:color-picker-outline" width={22} height={22} />
          </IconButton>
          <Typography variant="subtitle1">{fCurrency(price)}</Typography>
          <IconButton onClick={handleDelete}>
            <Icon icon="eva:close-circle-outline" width={22} height={22} />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
}
