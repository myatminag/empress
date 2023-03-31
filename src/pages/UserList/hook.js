import { useReducer, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { GET_USER_LIST, DELTE_USET_LIST } from "constants/api";

/* ----- reducer ----- */
const userListReducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_USER_LIST":
            return {
                ...state,
                loading: true,
            };
        case "SUCCESS_USER_LIST":
            return {
                ...state,
                loading: false,
                usersList: action.payload.usersList,
                page: action.payload.page,
                pages: action.payload.pages,
            };
        case "FAIL_USER_LIST":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "REQUEST_DELETE_USER":
            return {
                ...state,
                loadingDelete: true,
                successDelete: false,
            };
        case "SUCCESS_DELETE_USER":
            return {
                ...state,
                loadingDelete: false,
                successDelete: true,
            };
        case "FAIL_DELETE_USER":
            return {
                ...state,
                loadingDelete: false,
            };
        case "RESET_DELETE_USER":
            return {
                ...state,
                loadingDelete: false,
                successDelete: false,
            };
        default:
            return state;
    }
};

const useUserList = () => {
    const navigate = useNavigate();

    // ?page=1
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    const page = searchParams.get("page") || 1;

    // fetch user list from api
    const [{ loading, error, usersList, pages, loadingDelete, successDelete }, dispatch,] = useReducer(userListReducer, {
        loading: true,
        error: "",
    });

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                dispatch({ type: "REQUEST_USER_LIST" });
                const { data } = await axios.get(
                    `${GET_USER_LIST}?page=${page}`,
                    {
                        headers: {
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    }
                );

                dispatch({
                    type: "SUCCESS_USER_LIST",
                    payload: data,
                });
            } catch (error) {
                dispatch({
                    type: "FAIL_USER_LIST",
                    payload:
                        error.res && error.res.data.message
                        ? error.res.data.message
                        : error.message,
                });
                console.log(error);
            }
        };

        if (successDelete) {
            dispatch({ type: "RESET_DELETE_USER" });
        } else {
            fetchUserList();
        }
    }, [successDelete, page, navigate]);

    // delete user function
    const deleteUserHandler = async (user) => {
        try {
            dispatch({ type: "REQUEST_DELETE_USER" });

            await axios.delete(`${DELTE_USET_LIST}/${user._id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
        });

            dispatch({ type: "SUCCESS_DELETE_USER" });
            toast.success("Success Delete");
        } catch (error) {
            dispatch({ type: "FAIL_DELETE_USER" });
            console.log(error);
            navigate("*");
        }
    };

    return {
        navigate,
        loading,
        error,
        usersList,
        pages,
        page,
        loadingDelete,
        deleteUserHandler,
    };
};

export default useUserList;
