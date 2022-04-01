// material
import { Box, Container, Grid, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppConversionRates,
  AppCurrentSubject,
  AppCurrentVisits,
  AppItemOrders,
  AppNewUsers,
  AppWebsiteVisits,
  AppWeeklySales
} from '../components/_dashboard/app';
import { useLoadPagingHomeQuery } from '../reducers/home/api';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const { data } = useLoadPagingHomeQuery();

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Chào mừng quay trở lại!</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWeeklySales revenue={data?.revenue} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppNewUsers orderPlaced={data?.orderPlaced} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppItemOrders orderDelivered={data?.orderDelivered} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
