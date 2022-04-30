import { LoadingButton } from '@mui/lab';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import UploadImage from '../../components/Upload';
import { useCreateProductMutation, useUploadFileMutation } from '../../reducers/product/api';
import { useLoadPagingCategoriesQuery } from '../../reducers/category/api';
import { useNavigate } from 'react-router-dom';
import { useNotification } from 'src/hook/useNotification';
import { CREATE_SUCCESS } from 'src/constants/string';

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required'),
  description: Yup.string().required('Description is required'),
  quantity: Yup.number().min(1).required('quantity is required'),
  price: Yup.number().required('price is required')
});

export default function ProductForm() {
  const [image, setImage] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const navigate = useNavigate();

  const [createProduct, { error, isSuccess, isSubmitting }] = useCreateProductMutation();
  const { data } = useLoadPagingCategoriesQuery();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      quantity: 1
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

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard/products');
    }
  }, [isSuccess]);

  useNotification(error, isSuccess, CREATE_SUCCESS);

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
          <TextField
            type="number"
            inputProps={{ inputProps: { min: 1 } }}
            label="Số lượng"
            {...getFieldProps('quantity')}
            error={Boolean(touched.quantity && errors.quantity)}
            helperText={touched.quantity && errors.quantity}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 2 }}>
          <TextField
            label="Giá"
            type="number"
            inputProps={{ inputProps: { min: 1 } }}
            {...getFieldProps('price')}
            error={Boolean(touched.price && errors.price)}
            helperText={touched.price && errors.price}
          />
        </FormControl>

        <FormControl fullWidth sx={{ m: 2 }}>
          <InputLabel id="demo-simple-select-label">Loại sản phẩm</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={categoryId}
            label="Loại sản phẩm"
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
          <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
            Tạo sản phẩm
          </LoadingButton>
        </FormControl>
      </Form>
    </FormikProvider>
  );
}
