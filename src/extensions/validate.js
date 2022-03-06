import validate from 'src/constants/validate'
import * as Yup from 'yup'
import regex from '../constants/regex'

export default {
    username: Yup.string().required(validate.required),
    email: Yup.string().required(validate.required).email(validate.email),
    phoneNumber: Yup.string().required(validate.required).min(10, validate.phoneNumber)
        .matches(regex.phoneRegex, validate.phoneNumber),
    password: (length = 6) => {
        return Yup.string()
            .required(validate.required)
            .min(length, validate.password(length));
    },
    confirmPassword: (fieldName) => {
        return Yup.string()
            .required(validate.required)
            .oneOf([Yup.ref(fieldName), null], validate.confirmPassword);
    },
    image: Yup.string()

}