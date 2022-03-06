export default {
    required: 'Mục này không được để trống',
    email: 'Email không đúng định dạng',
    phoneNumber: 'Số điện thoại không đúng định dạng',
    password: (length = 6) => {
        return `Mật khẩu phải có ít nhất ${length} ký tự`;
    },
    confirmPassword: 'Mật khẩu không khớp',
}