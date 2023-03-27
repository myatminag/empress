import React from 'react';

import PwShowIcon from 'components/icons/PwShowIcon';
import PwHideIcon from 'components/icons/PwHideIcon';
import { WebTitle, SubTitle, ErrorField } from 'components';
import useResetPassword from './hook';

const ResetPassword = () => {

    const {
        showPassword, setShowPassword,
        showCPassword, setShowCPassword,
        values,
        handleSubmit,
        handleChange,
        touched,
        errors,
        isSubmitting
    } = useResetPassword();

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
                                <PwHideIcon />
                            ) : (
                                <PwShowIcon />
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
                    Confirm
                </button>
            </form>
        </section>
    )
};

export default ResetPassword;