import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Grid,
  Divider,
  FormControl
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      quantity: 0,
      image: [],
      discount: 0
    },
    validationSchema: LoginSchema,
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
                fullWidth
                id="outlined-start-adornment"
                autoComplete="name"
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
                fullWidth
                type="number"
                label="Quantity"
                {...getFieldProps('description')}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />
            </FormControl>
          </Grid>
        </Grid>

        {/* </Stack> */}

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
