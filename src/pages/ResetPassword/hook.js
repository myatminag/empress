import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from 'formik';
import axios from "axios";

import { BASE_URL } from "constants/baseURL";
import { PasswordSchema } from 'validations/index';

const useResetPassword = () => {

    const navigate = useNavigate();
    
    const { resetToken } = useParams();

    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const onSubmit = async (values) => {
        try {
            await axios.put(
                `${BASE_URL}/server/auth/reset-password/${resetToken}`, values
            );
            
            navigate('/');
        } catch (error) {
            navigate("*");
        }
    };

    const { values, handleSubmit, handleChange, touched, errors, isSubmitting } = useFormik({
        initialValues: {
            email: '',
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: PasswordSchema
    });

    return {
        showPassword, setShowPassword,
        showCPassword, setShowCPassword,
        values,
        handleSubmit,
        handleChange,
        touched,
        errors,
        isSubmitting

    }
}

export default useResetPassword;