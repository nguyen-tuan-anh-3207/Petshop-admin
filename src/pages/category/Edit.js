import { LoadingButton } from '@mui/lab';
import { Button, FormControl, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { CREATE_SUCCESS, UPDATE_SUCCESS } from '../../constants/string';
import { useNotification } from '../../hook/useNotification';
import * as Yup from 'yup';
import UploadImage from '../../components/Upload';
import { useLoadCategoriesQuery, useUpdateCategoriesMutation } from '../../reducers/category/api';
import { useNavigate, useParams } from 'react-router-dom';

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Category name is required'),
  description: Yup.string().required('Description is required')
});

export default function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: dataCategory, isLoading } = useLoadCategoriesQuery(id);

  const [image, setImage] = useState(dataCategory?.category?.image?.url);

  const [updateCategories, { error, isSuccess, isSubmitting }] = useUpdateCategoriesMutation();

  const formik = useFormik({
    initialValues: {
      name: dataCategory?.category?.name ?? '',
      description: dataCategory?.category?.description ?? ''
    },
    validationSchema: ProductSchema,
    onSubmit: (values) => {
      updateCategories({ ...values, image, categoryId: id });
    }
  });

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard/category');
    }
  }, [isSuccess]);

  useNotification(error, isSuccess, UPDATE_SUCCESS);

  const { errors, touched, handleSubmit, getFieldProps } = formik;

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
              <UploadImage setImage={setImage} image={image} />
            </FormControl>

            <FormControl sx={{ m: 2 }}>
              <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
                Cập nhật
              </LoadingButton>
            </FormControl>
          </Form>
        </FormikProvider>
      )}
    </>
  );
}
