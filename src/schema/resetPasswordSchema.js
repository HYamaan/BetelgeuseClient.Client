import * as Yup from 'yup';

export const ResetPasswordSchema = Yup.object({
    password: Yup.string().min(5, "Minimum 5 character")
        .required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match')
        .required('ConfirmPassword is required')
});
