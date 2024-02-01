import * as Yup from 'yup';

export const certificateValidationSchema = Yup.object({
    certificateID: Yup.string().required('The certificate id field is required.')
});
