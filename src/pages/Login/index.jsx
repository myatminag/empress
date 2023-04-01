import React from 'react';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import PwShowIcon from 'components/icons/PwShowIcon';
import PwHideIcon from 'components/icons/PwHideIcon';
import { WebTitle, ErrorField, SubTitle } from 'components';
import useLogin from './hook';

const Login = () => {

    const {
        isLoading, showPassword, unauthorized, handleShowPw,
        values, handleSubmit, handleChange, touched, errors
    } = useLogin();

    return (
        <section className="px-3 py-6 lg:px-6 mb-10">
            <WebTitle title={"Login"} />
            <SubTitle name={"Login"} />
            <form onSubmit={handleSubmit} className="md:w-[450px] md:mx-auto">
                <div className="mb-4">
                    {unauthorized && (
                        <Alert severity="error" sx={{ marginBottom: "10px", borderRadius: "0.375rem" }}>
                            <AlertTitle className="text-error">Authentication failed!</AlertTitle>
                            Please try refreshing the page and fill the correct login details.
                        </Alert>
                    )}
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
                        className="input-form"
                    />
                </div>
                <div className="mb-8">
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
                        <div onClick={handleShowPw} className="cursor-pointer">
                            {!showPassword ? (
                                <PwHideIcon />
                            ) : (
                                <PwShowIcon />
                            )}
                        </div>
                    </div> 
                </div>
                <button 
                    type="submit"
                    className="default-btn"
                >
                    {isLoading ? "Loading..." : "Login"}
                </button>
                <div className="flex items-center gap-x-2 mb-4">
                    <p className="text-sm text-secondaryDark">
                        New Customer?
                    </p>
                    <Link to='/signup'>
                        <p className="text-sm underline text-primaryDark">
                            Create your account
                        </p>
                    </Link>
                </div>
                <div className="flex items-center gap-x-2 mb-2">
                    <p className="text-sm text-secondaryDark">
                        Forget Password?
                    </p>
                    <Link to='/forgetpassword'>
                        <p className="text-sm underline text-primaryDark">
                            Recover Password
                        </p>
                    </Link>
                </div>
            </form>
        </section>
    )
};

export default Login;