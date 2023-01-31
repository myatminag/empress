import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi';
import { useFormik } from 'formik';
import axios from 'axios';

import { PasswordSchema } from 'validations/index';
import { WebTitle, SubTitle, ErrorField } from 'components';

const ResetPassword = () => {

    const navigate = useNavigate();
    
    const { resetToken } = useParams();

    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const onSubmit = async (values) => {
        try {
            await axios.put(
                `https://empress-api.onrender.com/server/auth/reset-password/${resetToken}`, values
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

    return (
        <section className="px-3 py-6 lg:px-6 mb-10 md:mb-0 md:px-[15%] 2xl:px-[20%]">
            <WebTitle title={"Reset Password"} />
            <SubTitle name={"Reset Password"} />
            <form onSubmit={handleSubmit} className="md:w-[450px] md:mx-auto">
                <div className="mb-4">
                    <label className="block mb-2">
                        New Password
                    </label>
                    {touched.password && errors.password && <ErrorField text={errors.password} />}
                    <div className="flex items-center justify-between w-[100%] px-4 py-2 rounded-md border">
                        <input 
                            type={!showPassword ? "password" : "text"}
                            name="password"
                            placeholder="Please enter your password"
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
                            placeholder="Please enter your password"
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
                    Confirm
                </button>
            </form>
        </section>
    )
};

export default ResetPassword;