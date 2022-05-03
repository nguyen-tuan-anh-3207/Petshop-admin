import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
import { CategoryPostCard } from '../../components/_dashboard/category';
import { useLoadPagingCategoriesQuery } from '../../reducers/category/api';

export default function Categories() {
  const { data } = useLoadPagingCategoriesQuery();

  return (
    <Page title="Dashboard: Categories | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Loại sản phẩm
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/category/create"
            startIcon={<Icon icon={plusFill} />}
          >
            Tạo loại sản phẩm
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {data?.categories?.map((category, index) => (
            <CategoryPostCard key={category._id} category={category} index={category._id} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
