import { LoadingButton } from '@mui/lab';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import UploadImage from '../../components/Upload';
import { useCreateCategoriesMutation } from '../../reducers/category/api';

const Input = styled('input')({
  display: 'none'
});

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Category name is required'),
  description: Yup.string().required('Description is required')
});

export default function CategoryForm() {
  const [image, setImage] = useState('');

  const [createCategory, { error, isSuccess, isSubmitting }] = useCreateCategoriesMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      image: []
    },
    validationSchema: ProductSchema,
    onSubmit: (values) => {
      createCategory({ ...values, image });
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ m: 2 }}>
          <TextField
            type="name"
            label="Tên"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2 }}>
          <TextField
            fullWidth
            multiline
            autoComplete="current-password"
            type="description"
            label="Miêu tả"
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />
        </FormControl>

        <FormControl fullWidth sx={{ m: 2 }}>
          <UploadImage setImage={setImage} />
        </FormControl>

        <FormControl sx={{ m: 2 }}>
          <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
            Tạo
          </LoadingButton>
        </FormControl>
      </Form>
    </FormikProvider>
  );
}
