import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

import { Context } from "context/user-context";
import { SignupSchema } from "validations";
import { REGISTER } from "constants/api";

const useRegister = () => {
    const { state, dispatch: authDispatch } = useContext(Context);
    const { userInfo } = state;

    /**
     * if userInfo is stored
     * redirect to the current page
     */
    const navigate = useNavigate();

    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectUrl ? redirectUrl : "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    /* ----- submit func ----- */
    const onSubmit = async (values) => {
        setIsLoading(true);
        try {
            const { data } = await axios.post(`${REGISTER}`, values);

            authDispatch({
                type: "REQUEST_LOGIN",
                payload: data.user,
            });

            if (data.success === true) {
                localStorage.setItem("userInfo", JSON.stringify(data.user));
                localStorage.setItem("accessToken", data.token);
                navigate(redirect || "/");
            }
        } catch (error) {
            navigate("*");
        }
    };

    const { values, handleSubmit, handleChange, touched, errors, isSubmitting } = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            cpassword: "",
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: SignupSchema,
    });

    return {
        isLoading,
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

export default useRegister;
