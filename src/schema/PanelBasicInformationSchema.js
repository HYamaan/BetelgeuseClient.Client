import * as Yup from 'yup';

export const PanelBasicInformationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    name: Yup.string().min(3, "Minimum 3 character")
        .required('The full name field is required.'),
    password: Yup.string().min(5, "Minimum 5 character")
        .required('The password field is required.'),
    confirmPassword: Yup.string().min(5, "Minimum 5 character")
        .required('The confirm password field is required.')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    phone: Yup.string().min(10, "Minimum 10 character")
        .required('The phone field is required.'),
    language: Yup.string().required('The language field is required.'),
    timezone: Yup.string().required('The timezone field is required.'),
    currency: Yup.string().required('The currency field is required.'),
});
