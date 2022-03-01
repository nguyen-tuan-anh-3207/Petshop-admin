import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { TextField, Grid, FormControl, Stack, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function ProductForm() {
  const ProductSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    description: Yup.string().required('Description is required'),
    quantity: Yup.number().required('quantity is required'),
    price: Yup.number().required('price is required'),
    discount: Yup.number().required('discount is required')
    // image: Yup.string().required('Description is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      image: [],
      discount: 0
    },
    validationSchema: ProductSchema,
    onSubmit: (values) => {
      console.log('values..', values);
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={8}>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                type="name"
                label="Name"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
            </FormControl>
          </Grid>

          <Grid item xs={8}>
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
          </Grid>

          <Grid item xs={8}>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                type="number"
                label="Quantity"
                {...getFieldProps('quantity')}
                error={Boolean(touched.quantity && errors.quantity)}
                helperText={touched.quantity && errors.quantity}
              />
            </FormControl>
          </Grid>

          <Grid item xs={8}>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                type="number"
                label="Price"
                {...getFieldProps('price')}
                error={Boolean(touched.price && errors.price)}
                helperText={touched.price && errors.price}
              />
            </FormControl>
          </Grid>

          <Grid item xs={8}>
            <FormControl fullWidth sx={{ m: 2 }}>
              <TextField
                type="number"
                label="Discount"
                {...getFieldProps('discount')}
                error={Boolean(touched.discount && errors.discount)}
                helperText={touched.discount && errors.discount}
              />
            </FormControl>
          </Grid>
        </Grid>

        <FormControl xs={{ m: 2 }}>
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
