import { useEffect, useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { BASE_URL } from "constants/api";

/* ----- reducer ----- */
const orderListReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_ORDER_LIST":
      return {
        ...state,
        loading: true,
      };
    case "SUCCESS_ORDER_LIST":
      return {
        ...state,
        loading: false,
        ordersList: action.payload.ordersList,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case "FAIL_ORDER_LIST":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "REQUEST_DELETE_ORDER":
      return {
        ...state,
        loadingDelete: true,
        successDelete: false,
      };
    case "SUCCESS_DELETE_ORDER":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "FAIL_DELETE_ORDER":
      return {
        ...state,
        loadingDelete: false,
      };
    case "RESET_DELETE":
      return {
        ...state,
        loadingDelete: false,
        successDelete: false,
      };
    default:
      return state;
  }
};

const useOrderList = () => {
  const navigate = useNavigate();

  // ?page=1
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const page = searchParams.get("page") || 1;

  const [
    { loading, error, ordersList, pages, loadingDelete, successDelete },
    dispatch,
  ] = useReducer(orderListReducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        dispatch({ type: "REQUEST_ORDER_LIST" });

        const { data } = await axios.get(
          `${BASE_URL}/server/orders/admin?page=${page}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        dispatch({
          type: "SUCCESS_ORDER_LIST",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "FAIL_ORDER_LIST",
          payload:
            error.res && error.res.data.message
              ? error.res.data.message
              : error.message,
        });
        console.log(error);
      }
    };
    if (successDelete) {
      dispatch({ type: "RESET_DELETE" });
    } else {
      fetchOrderList();
    }
  }, [page, successDelete, navigate]);

  /* ----- delete func ----- */
  const deleteOrderHandler = async (order) => {
    try {
      dispatch({ type: "REQUEST_DELETE_ORDER" });

      await axios.delete(`${BASE_URL}/server/orders/order/${order._id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      dispatch({ type: "SUCCESS_DELETE_ORDER" });
      toast.success("Success Deleted");
    } catch (error) {
      dispatch({ type: "FAIL_DELETE_ORDER" });
      console.log(error);
      navigate("*");
    }
  };

  return {
    navigate,
    loading,
    error,
    ordersList,
    pages,
    page,
    loadingDelete,
    deleteOrderHandler,
  };
};

export default useOrderList;
