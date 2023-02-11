import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi';
import { useFormik } from 'formik';
import axios from 'axios';

import { Context } from 'context/user-context'; 
import { SignupSchema } from 'validations';
import { WebTitle, ErrorField, SubTitle } from 'components';

const Login = () => {

    // after register, let the user to redirect current url
    const navigate = useNavigate();

    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect'); 
    const redirect = redirectUrl ? redirectUrl : '/';

    const { state, dispatch: authDispatch } = useContext(Context);
    const { userInfo } = state;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const onSubmit = async (values) => {
        setIsLoading(true);
        try { 
            const { data } = await axios.post(
                'https://empress-api.onrender.com/server/auth/register', values
            );

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
            navigate('*');
        }
    };

    const { values, handleSubmit, handleChange, touched, errors, isSubmitting } = useFormik({ 
        initialValues: {
            username: '',
            email: '',
            password: '',
            cpassword: ''
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: SignupSchema
    });
    
    return (
        <section className="px-3 py-6 lg:px-6 mb-10">  
            <WebTitle title={"Register"} />
            <SubTitle name={"Register"} />
            <form onSubmit={handleSubmit} className="md:w-[450px] md:mx-auto">
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-2">
                        Username
                    </label>
                    {touched.username && errors.username && <ErrorField text={errors.username} />}
                    <input 
                        type="text"
                        name="username"
                        placeholder="Please enter username"
                        value={values.username}
                        onChange={handleChange}
                        className="w-[100%] px-4 py-2 rounded-md border text-sm placeholder:text-sm focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">
                        Email Address
                    </label>
                    {touched.email && errors.email && <ErrorField text={errors.email} />}
                    <input 
                        type="email"
                        name="email"
                        placeholder="Please enter email address"
                        value={values.email}
                        onChange={handleChange}
                        className="w-[100%] px-4 py-2 rounded-md border text-sm placeholder:text-sm focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">
                        Password
                    </label>
                    {touched.password && errors.password && <ErrorField text={errors.password} />}
                    <div className="flex items-center justify-between w-[100%] px-4 py-2 rounded-md border">
                        <input 
                            type={!showPassword ? "password" : "text"}
                            name="password"
                            placeholder="Please enter password"
                            value={values.password}
                            onChange={handleChange}
                            className="w-[100%] text-sm placeholder:text-sm focus:outline-none"
                        />
                        <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                            {!showPassword ? (
                                <BiHide size={23} color="#0F2027" />
                            ) : (
                                <BiShow size={23} color="#0F2027" />
                            )}
                        </div>
                    </div>
                </div>
                <div className="mb-8">
                    <label className="block mb-2">
                        Confirm Password
                    </label>
                    {touched.cpassword && errors.cpassword && <ErrorField text={errors.cpassword} />}
                    <div className="flex items-center justify-between w-[100%] px-4 py-2 rounded-md border">
                        <input 
                            type={!showCPassword ? "password" : "text"}
                            name="cpassword"
                            placeholder="Please enter confirm password"
                            value={values.cpassword}
                            onChange={handleChange}
                            className="w-[100%] text-sm placeholder:text-sm focus:outline-none"
                        />
                        <div onClick={() => setShowCPassword(!showCPassword)} className="cursor-pointer">
                            {!showCPassword ? (
                                <BiHide size={23} color="#0F2027" />
                            ) : (
                                <BiShow size={23} color="#0F2027" />
                            )}
                        </div>
                    </div>
                </div>
                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-[100%] px-4 py-2 mb-6 text-sm text-white tracking-wider bg-primaryDark border border-primaryDark hover:text-primaryDark hover:bg-white transition duration-200"
                >
                    {isLoading ? "Loading..." : "Register"}
                </button>
                <div className="flex items-center gap-x-2 mb-4">
                    <p className="text-sm text-secondaryDark">
                        Already have an account?
                    </p>
                    <Link to='/login'>
                        <p className="text-sm underline text-primaryDark">
                            Login here
                        </p>
                    </Link>
                </div>
            </form>
        </section>
    )
};

export default Login;