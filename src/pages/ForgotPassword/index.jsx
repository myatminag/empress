import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';

import { EmailSchema } from 'validations/index';
import { WebTitle, SubTitle, ErrorField } from 'components';
import { FORGET_PASSWORD } from 'constants/api';

const ForgetPassword = () => {

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

    return (
        <>
            <ToastContainer position='bottom-center' limit={1} />
            <section className="px-3 py-6 lg:px-6 mb-10">
                <WebTitle title={"Forgot Password"} />
                <SubTitle name={"Forgot Password"} />
                <div className="md:w-[450px] md:mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2">
                                Email
                            </label>
                            {touched.email && errors.email && <ErrorField text={errors.email} />}
                            <input 
                                type="email"
                                name="email"
                                placeholder="Please enter your email"
                                value={values.email}
                                onChange={handleChange}
                                className="w-[100%] px-4 py-2 rounded-md border text-sm placeholder:text-sm focus:outline-none"
                            />
                        </div>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-[100%] px-4 py-2 mb-6 text-sm text-white tracking-wider bg-primaryDark border border-primaryDark hover:text-primaryDark hover:bg-white transition duration-200"
                        >
                            Request
                        </button>
                        <div className="">
                            <Link to='/login'>
                                <p className="text-sm underline text-primaryDark">
                                    Back to login
                                </p>
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
};

export default ForgetPassword;