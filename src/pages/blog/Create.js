import { LoadingButton } from '@mui/lab';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import UploadImage from '../../components/Upload';

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required'),
  description: Yup.string().required('Description is required'),
  quantity: Yup.number().required('quantity is required'),
  price: Yup.number().required('price is required')
});

export default function ProductForm() {
  const [image, setImage] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '',
      url: ''
    },
    validationSchema: ProductSchema,
    onSubmit: (values) => {}
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ m: 2 }}>
          <TextField
            type="title"
            label="Title"
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
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            // loading={isSubmitting}
          >
            Create
          </LoadingButton>
        </FormControl>
      </Form>
    </FormikProvider>
  );
}
