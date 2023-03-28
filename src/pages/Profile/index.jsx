import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PwShowIcon from 'components/icons/PwShowIcon';
import PwHideIcon from 'components/icons/PwHideIcon';
import useProfile from './hook';
import { WebTitle, ErrorField, SubTitle } from 'components';

const Profile = () => {

    const {
        showPassword, setShowPassword,
        loading,
        values,
        handleSubmit,
        handleChange,
        touched,
        errors,
        isSubmitting
    } = useProfile()

    return (
        <>
            <ToastContainer position='bottom-center' limit={1} />
            <section className="px-3 py-6 lg:px-6">
                <WebTitle title={"Account Info"} />
                <SubTitle name={"Account Info"} />
                <form onSubmit={handleSubmit} className="md:w-[450px] md:mx-auto">
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2">
                            Username
                        </label>
                        {touched.username && errors.username && <ErrorField text={errors.username} />}
                        <input 
                            type="text"
                            name="username"
                            placeholder="Please enter new username"
                            value={values.username}
                            onChange={handleChange}
                            className="input-form"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">
                            Email address
                        </label>
                        {touched.email && errors.email && <ErrorField text={errors.email} />}
                        <input 
                            type="email"
                            name="email"
                            placeholder="Please enter new email"
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
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="default-btn"
                    >
                        {loading ? "Loading..." : "Save Changes"}
                    </button>
                </form>
            </section>
        </>
    )
};

export default Profile;