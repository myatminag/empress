import React from 'react';
import { Link } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi';

import { WebTitle, ErrorField, SubTitle } from 'components';
import { useLogin } from './Hook';

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
                        <div className="mb-3 px-3 py-2 border rounded-md border-error">
                            <p className="text-error text-center font-semibold">
                                Authentication failed!
                            </p>
                            <p className="text-error text-center font-semibold">
                                Please try refreshing the page and fill the correct login details.
                            </p>
                        </div>
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
                        className="w-[100%] px-4 py-2 rounded-md border text-sm placeholder:text-sm focus:outline-none"
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
                                <BiHide size={23} color="#0F2027" />
                            ) : (
                                <BiShow size={23} color="#0F2027" />
                            )}
                        </div>
                    </div> 
                </div>
                <button 
                    type="submit"
                    className="w-[100%] px-4 py-2 mb-6 text-sm text-white tracking-wider bg-primaryDark border border-primaryDark hover:text-primaryDark hover:bg-white transition duration-200"
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