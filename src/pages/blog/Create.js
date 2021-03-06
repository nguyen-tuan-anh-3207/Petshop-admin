import { LoadingButton } from '@mui/lab';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CREATE_SUCCESS } from '../../constants/string';
import { useNotification } from '../../hook/useNotification';
import * as Yup from 'yup';

import UploadImage from '../../components/Upload';
import { useCreateBlogsMutation } from '../../reducers/blog/api';

const ProductSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  url: Yup.string().required('Url is required')
});

export default function ProductForm() {
  const [image, setImage] = useState('');

  const [onCreateBlog, { error, isSuccess, isSubmitting }] = useCreateBlogsMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      url: ''
    },
    validationSchema: ProductSchema,
    onSubmit: (values) => {
      onCreateBlog({
        ...values,
        image
      });
    }
  });

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard/blog');
    }
  }, [isSuccess]);

  useNotification(error, isSuccess, CREATE_SUCCESS);

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ m: 2 }}>
          <TextField
            type="title"
            label="Tiêu đề"
            {...getFieldProps('title')}
            error={Boolean(touched.title && errors.title)}
            helperText={touched.title && errors.title}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2 }}>
          <TextField
            fullWidth
            multiline
            type="url"
            label="Url"
            {...getFieldProps('url')}
            error={Boolean(touched.url && errors.url)}
            helperText={touched.url && errors.url}
          />
        </FormControl>

        <FormControl fullWidth sx={{ m: 2 }}>
          <UploadImage setImage={setImage} />
        </FormControl>

        <FormControl sx={{ m: 2 }}>
          <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
            Tạo blog
          </LoadingButton>
        </FormControl>
      </Form>
    </FormikProvider>
  );
}
