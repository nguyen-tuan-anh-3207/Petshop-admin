import { LoadingButton } from '@mui/lab';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import * as axios from 'axios';
import UploadImage from '../../components/Upload';
import { useCreateProductMutation, useUploadFileMutation } from '../../reducers/product/api';
import { useLoadPagingCategoriesQuery } from '../../reducers/category/api';

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required'),
  description: Yup.string().required('Description is required'),
  quantity: Yup.number().required('quantity is required'),
  price: Yup.number().required('price is required')
});

export default function ProductForm() {
  const [image, setImage] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [createProduct, { error, isSuccess }] = useCreateProductMutation();
  const { data } = useLoadPagingCategoriesQuery();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      quantity: 0
    },
    validationSchema: ProductSchema,
    onSubmit: (values) => {
      createProduct({ ...values, image, categoryId });
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  const handleChange = (e) => {
    setCategoryId(e.target.value);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ m: 2 }}>
          <TextField
            type="name"
            label="Name"
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
            label="Description"
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2 }}>
          <TextField
            type="number"
            label="Quantity"
            {...getFieldProps('quantity')}
            error={Boolean(touched.quantity && errors.quantity)}
            helperText={touched.quantity && errors.quantity}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2 }}>
          <TextField
            label="Price"
            {...getFieldProps('price')}
            error={Boolean(touched.price && errors.price)}
            helperText={touched.price && errors.price}
          />
        </FormControl>

        <FormControl fullWidth sx={{ m: 2 }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={categoryId}
            label="Category"
            onChange={handleChange}
          >
            {data?.categories?.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
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
