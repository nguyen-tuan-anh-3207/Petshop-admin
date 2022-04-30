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
import { useNotification } from 'src/hook/useNotification';
import { CREATE_SUCCESS, UPDATE_SUCCESS } from 'src/constants/string';

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required'),
  description: Yup.string().required('Description is required'),
  quantity: Yup.number().min(1, 'Số lượng phải lớn hơn 1').required('Số lượng là bắt buộc'),
  price: Yup.number().min(1).required('price is required')
});

export default function Edit() {
  const { id } = useParams();

  const { data: dataProduct, isLoading } = useLoadProductsQuery(id);

  const [image, setImage] = useState(dataProduct?.product?.image.url);
  const [categoryId, setCategoryId] = useState(dataProduct?.product.categoryId._id);

  const [updateProduct, { error, isSuccess, isSubmitting }] = useUpdateProductsMutation();

  const { data } = useLoadPagingCategoriesQuery();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: dataProduct?.product?.name ?? '',
      description: dataProduct?.product?.description ?? '',
      price: dataProduct?.product?.price ?? 0,
      quantity: dataProduct?.product?.quantity ?? 0
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

  useNotification(error, isSuccess, UPDATE_SUCCESS);

  return (
    <>
      {!isLoading && (
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
                label="Số lượng"
                {...getFieldProps('quantity')}
                error={Boolean(touched.quantity && errors.quantity)}
                helperText={touched.quantity && errors.quantity}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                label="Giá"
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
              <UploadImage setImage={setImage} image={image} />
            </FormControl>

            <FormControl sx={{ m: 2 }}>
              <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
                Cập nhật sản phẩm
              </LoadingButton>
            </FormControl>
          </Form>
        </FormikProvider>
      )}
    </>
  );
}
