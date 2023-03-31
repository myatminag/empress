import { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { Context } from "context/user-context";
import { UpdateSchema } from "validations";
import { BASE_URL } from "constants/api";

/* ----- reducer ----- */
const updateProfileReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_UPDATE_PROFILE":
      return {
        ...state,
        loading: true,
      };
    case "SUCCESS_UPDATE_PROFILE":
      return {
        ...state,
        loading: false,
      };
    case "FAIL_UPDATE_PROFILE":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const useProfile = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { dispatch: updateDispatch } = useContext(Context);

  const [{ loading }, dispatch] = useReducer(updateProfileReducer, {
    loading: false,
  });

  /* ----- submit func ----- */
  const onSubmit = async (values) => {
    try {
      dispatch({ type: "REQUEST_UPDATE_PROFILE" });

      const { data } = await axios.put(
        `${BASE_URL}/server/user/profile`,
        values,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      updateDispatch({
        type: "REQUEST_LOGIN",
        payload: data.user,
      });

      localStorage.setItem("userInfo", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.token);
      toast.success("Successfully Updated");
      navigate("/");
    } catch (error) {
      dispatch({ type: "FAIL_UPDATE_PROFILE" });
      navigate("*");
    }
  };

  const { values, handleSubmit, handleChange, touched, errors, isSubmitting } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
      },
      validateOnBlur: true,
      onSubmit,
      validationSchema: UpdateSchema,
    });

  return {
    showPassword,
    setShowPassword,
    loading,
    values,
    handleSubmit,
    handleChange,
    touched,
    errors,
    isSubmitting,
  };
};

export default useProfile;
