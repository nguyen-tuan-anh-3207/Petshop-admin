import { LoadingButton } from '@mui/lab';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import UploadImage from '../../components/Upload';
import { useLoadProductsQuery, useUpdateProductsMutation } from '../../reducers/product/api';
import { useLoadPagingCategoriesQuery } from '../../reducers/category/api';
import { useParams } from 'react-router-dom';

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required'),
  description: Yup.string().required('Description is required'),
  quantity: Yup.number().required('quantity is required'),
  price: Yup.number().required('price is required')
});

export default function Edit() {
  const { id } = useParams();
  const { data: dataProduct } = useLoadProductsQuery(id);
  const [image, setImage] = useState('');
  const [categoryId, setCategoryId] = useState(dataProduct?.product.categoryId._id);

  const [updateProduct, { error, isSuccess }] = useUpdateProductsMutation();

  const { data } = useLoadPagingCategoriesQuery();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: dataProduct?.product?.name,
      description: dataProduct?.product?.description,
      price: dataProduct?.product?.price,
      quantity: dataProduct?.product?.quantity
    },
    validationSchema: ProductSchema,
    onSubmit: (values) => {
      const dataUpdate = { ...values, categoryId, productId: id };
      if (image) {
        dataUpdate.image = image;
      }
      updateProduct(dataUpdate);
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
            Update
          </LoadingButton>
        </FormControl>
      </Form>
    </FormikProvider>
  );
}
