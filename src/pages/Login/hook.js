import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

import { Context } from 'context/user-context';
import { LoginSchema } from 'validations/index';
import { LOGIN } from 'constants/api';

const useLogin = () => {

    const navigate = useNavigate();

    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';

    const { state , dispatch: authDispatch } = useContext(Context);
    const { userInfo } = state;
 
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [unauthorized, setUnauthorized] = useState(false); 

    const handleShowPw = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (values) => { 
        setIsLoading(true);
        try {
            const { data } = await axios.post(`${LOGIN}`, values);

            authDispatch({
                type: "REQUEST_LOGIN",
                payload: data.user
            });
            
            if (data.success === true) {
                localStorage.setItem('userInfo', JSON.stringify(data.user));
                localStorage.setItem('accessToken', data.token)
                navigate(redirect || '/');  
            }

        } catch (error) {
            setUnauthorized(true)
            setTimeout(() => {
                setUnauthorized(false);
            }, 5000)
            setIsLoading(false);
        }
    };

    const { values, handleSubmit, handleChange, touched, errors } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: LoginSchema
    });

    return {
        isLoading, showPassword, unauthorized, handleShowPw,
        values, handleSubmit, handleChange, touched, errors
    }
};

export default useLogin;