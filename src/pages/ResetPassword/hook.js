import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

import { RESET_PASSWORD } from "constants/api";
import { PasswordSchema } from "validations/index";

const useResetPassword = () => {
    const navigate = useNavigate();

    const { resetToken } = useParams();

    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const onSubmit = async (values) => {
        try {
            await axios.put(
                `${RESET_PASSWORD}/${resetToken}`,
                values
            );

            navigate("/");
        } catch (error) {
            navigate("*");
        }
    };

    const { values, handleSubmit, handleChange, touched, errors, isSubmitting } = useFormik({
        initialValues: {
            email: "",
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: PasswordSchema,
    });

    return {
        showPassword,
        setShowPassword,
        showCPassword,
        setShowCPassword,
        values,
        handleSubmit,
        handleChange,
        touched,
        errors,
        isSubmitting,
    };
};

export default useResetPassword;
