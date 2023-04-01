import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { WebTitle, SubTitle, ErrorField } from 'components';
import useForgotPassword from './hook';

const ForgetPassword = () => {

    const {
        values,
        handleSubmit,
        handleChange,
        touched,
        errors,
        isSubmitting
    } = useForgotPassword();

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
                                className="input-form"
                            />
                        </div>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="default-btn"
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