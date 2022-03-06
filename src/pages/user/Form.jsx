import { LoadingButton } from '@mui/lab';
import { FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import UploadImage from 'src/components/Upload';
import * as Yup from 'yup';
import validate from '../../extensions/validate';

const UserSchema = Yup.object().shape({
    username: validate.username,
    email: validate.email,
    phoneNumber: validate.phoneNumber,
    password: validate.password(6),
    confirmPassword: validate.confirmPassword('password'),
    image: validate.image,
});

export default function UserForm(props) {

    const { submit, title, mode, data, isLoading } = props

    const [image, setImage] = useState('');

    const formik = useFormik({
        initialValues: {
            username: data?.username ?? '',
            email: data?.email ?? '',
            phoneNumber: data?.phoneNumber ?? '',
            password: data?.password ?? '',
            confirmPassword: data?.confirmPassword ?? '',
            image: data?.image ?? '',
            role: data?.role ?? 0
        },
        validationSchema: UserSchema,
        onSubmit: (values) => {
            if (submit) {
                submit(values)
            }
        }
    });

    const { errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;

    useEffect(() => {
        setFieldValue('image', image)
    }, [image])

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ m: 2 }}>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {title}
                    </Typography>
                </FormControl>

                <FormControl fullWidth sx={{ m: 2 }}>
                    <TextField
                        type="username"
                        label="Tên đăng nhập"
                        {...getFieldProps('username')}
                        error={Boolean(touched.username && errors.username)}
                        helperText={touched.username && errors.username}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ m: 2 }}>
                    <TextField
                        type="email"
                        label="Email"
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ m: 2 }}>
                    <TextField
                        type="phoneNumber"
                        label="Số điện thoại"
                        {...getFieldProps('phoneNumber')}
                        error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ m: 2 }}>
                    <TextField
                        type="password"
                        label="Mật khẩu"
                        {...getFieldProps('password')}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ m: 2 }}>
                    <TextField
                        type="confirmPassword"
                        label="Nhập lại mật khẩu"
                        {...getFieldProps('confirmPassword')}
                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ m: 2 }}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        {...getFieldProps('role')}
                        label="Vai trò"
                        onChange={(e) => setFieldValue('role', e.target.value)}
                    >
                        <MenuItem value={0}>Khách hàng</MenuItem>
                        <MenuItem value={1}>Admin</MenuItem>
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
                        loading={isLoading}
                    >
                        Create
                    </LoadingButton>
                </FormControl>
            </Form>
        </FormikProvider>
    );
}
