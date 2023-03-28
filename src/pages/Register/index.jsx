import React from 'react';
import { Link } from 'react-router-dom';

import PwShowIcon from 'components/icons/PwShowIcon';
import PwHideIcon from 'components/icons/PwHideIcon';
import { WebTitle, ErrorField, SubTitle } from 'components';
import useRegister from './hook';

const Login = () => {

    const {
        isLoading,
        showPassword, setShowPassword,
        showCPassword, setShowCPassword,
        values,
        handleSubmit,
        handleChange,
        touched,
        errors,
        isSubmitting
    } = useRegister();
  
    return (
        <section className="px-3 py-6 lg:px-6 mb-10">  
            <WebTitle title={"Register"} />
            <SubTitle name={"Register"} />
            <form onSubmit={handleSubmit} className="md:w-[450px] md:mx-auto">
                {/* ----- username ----- */}
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
                        className="input-form"
                    />
                </div>
                {/* ----- email ----- */}
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
                        className="input-form"
                    />
                </div>
                {/* ----- password ----- */}
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
                                <PwHideIcon />
                            ) : (
                                <PwShowIcon />
                            )}
                        </div>
                    </div>
                </div>
                {/* ----- confirm password ----- */}
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
                                <PwHideIcon />
                            ) : (
                                <PwShowIcon />
                            )}
                        </div>
                    </div>
                </div>
                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="default-btn"
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