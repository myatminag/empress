import { useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { ADMIN_GET_ITEM, DELETE_ITEM } from 'constants/api';

const itemListReducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_ITEM_LIST":
            return {
                ...state,
                loading: true
            }
        case "SUCCESS_ITEM_LIST":
            return {
                ...state,
                loading: false,
                itemList: action.payload.itemList,
                page: action.payload.page,
                pages: action.payload.pages
            }
        case "FAIL_ITEM_LIST":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case "REQUEST_DELETE_ITEM":
            return {
                ...state,
                loadingDelete: true,
                successDelete: false
            }
        case "SUCCESS_DELETE_ITEM":
            return {
                ...state,
                loadingDelete: false,
                successDelete: true
            }
        case "FAIL_DELETE_ITEM":
            return {
                ...state, 
                loadingDelete: false,
                successDelete: false
            }
        case "RESET_DELETE_ITEM":
            return {
                ...state,
                loadingDelete: false,
                successDelete: false
            }
        default:
            return state;
    }
};

const useItemList = () => {

    const navigate = useNavigate();

    // ?page=1
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search); 

    const page = searchParams.get('page') || 1;

    // fetch item list from api
    const [{ loading, error, itemList, pages, loadingDelete, successDelete }, dispatch] = useReducer(itemListReducer, {
        loading: true,
        error: ''
    });

    useEffect(() => {
        const fetchItemList = async () => { 
            try {
                dispatch({ type: "REQUEST_ITEM_LIST" });

                const { data } = await axios.get(
                    `${ADMIN_GET_ITEM}?page=${page}`, {
                        headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                    }
                );

                dispatch({
                    type: "SUCCESS_ITEM_LIST",
                    payload: data
                });
            } catch (error) {
                dispatch({
                    type: "FAIL_ITEM_LIST",
                    payload: error.res && error.res.data.message 
                    ? error.res.data.message 
                    : error.message
                });
                console.log(error);
            }
        };
        if (successDelete) {
            dispatch({ type: "RESET_DELETE_ITEM" });
        } else {
            fetchItemList();
        }
    }, [page, successDelete, navigate]);

    /** Delete Item */
    const deleteItemHandler = async (item) => {
        try {
            dispatch({ type: "REQUEST_DELETE_ITEM" });

            await axios.delete(
                `${DELETE_ITEM}/${item._id}`, {
                    headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                }
            );

            dispatch({ type: "SUCCESS_DELETE_ITEM" });
            toast.success('Success Delete');
        } catch (error) {
            dispatch({ type: "FAIL_DELETE_ITEM" });
            navigate('*');
        }
    };

    return {
        navigate,
        loading,
        error,
        itemList,
        pages,
        page,
        loadingDelete,
        deleteItemHandler
    }
}

export default useItemList;