import React, { useContext, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { Context } from 'context/user-context';
import { updateProfileReducer } from 'pages/Profile/reducer';
import { UpdateSchema } from 'validations';
import { WebTitle, ErrorField, SubTitle } from 'components';
import { baseUrl } from 'utils/baseUrl';

const Profile = () => {

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const { dispatch: updateDispatch } = useContext(Context);

    const [{ loading }, dispatch] = useReducer(updateProfileReducer, {
        loading: false
    });

    const onSubmit = async (values) => {
        try {
            dispatch({ type: "REQUEST_UPDATE_PROFILE" });

            const { data } = await axios.put(
                `${baseUrl}/server/user/profile`, values, {
                    headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                }
            );

            updateDispatch({
                type: "REQUEST_LOGIN",
                payload: data.user
            });

            localStorage.setItem('userInfo', JSON.stringify(data.user)); 
            localStorage.setItem('accessToken', data.token);
            toast.success('Successfully Updated');
            navigate('/');
        } catch (error) {
            dispatch({ type: "FAIL_UPDATE_PROFILE" });
            navigate('*');
        }
    };

    const { values, handleSubmit, handleChange, touched, errors, isSubmitting } = useFormik({ 
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: UpdateSchema
    });

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
                            className="w-[100%] px-4 py-2 rounded-md border text-sm placeholder:text-sm focus:outline-none"
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
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-[100%] px-4 py-2 mb-6 text-sm text-white tracking-wider bg-primaryDark border border-primaryDark hover:text-primaryDark hover:bg-white transition duration-200"
                    >
                        {loading ? "Loading..." : "Save Changes"}
                    </button>
                </form>
            </section>
        </>
    )
};

export default Profile;