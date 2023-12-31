import * as Yup from "yup";

export const FooterSchema=Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
});
