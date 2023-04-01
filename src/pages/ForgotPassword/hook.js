import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

import { EmailSchema } from 'validations/index';
import { FORGET_PASSWORD } from 'constants/api';

const useForgotPassword = () => {

    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            await axios.post(`${FORGET_PASSWORD}`, values);
            toast.success("Email Sent.");
        } catch (error) {
            navigate('*');
        }
    };

    const { values, handleSubmit, handleChange, touched, errors, isSubmitting } = useFormik({
        initialValues: {
            email: '',
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: EmailSchema
    });

    return {
        values,
        handleSubmit,
        handleChange,
        touched,
        errors,
        isSubmitting
    }
}

export default useForgotPassword;