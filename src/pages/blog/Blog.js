import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
import { BlogPostCard } from '../../components/_dashboard/blog';
//
import { useLoadPagingBlogsQuery } from '../../reducers/blog/api';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Blog() {
  const { data: blogs } = useLoadPagingBlogsQuery();

  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/blog/create"
            startIcon={<Icon icon={plusFill} />}
          >
            Tạo blog
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {blogs?.blogs?.map((post, index) => (
            <BlogPostCard key={post._id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
