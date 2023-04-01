import { useEffect, useReducer, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import axios from 'axios';

import { Context } from 'context/user-context';
import { PAYPAL_PAYMENT, GET_ORDET_DETAIL, GET_PAYPEL_KEYS, DELIVER_ORDER } from 'constants/api';

const invoiceReducer = (state, action) => {
    switch (action.type) {
        // Invoice
        case "REQUEST_INVOICE":
            return {
                ...state,
                loading: true,
                error: ''
            }
        case "SUCCESS_INVOICE":
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: ''
            }
        case "FAIL_INVOICE":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        // Payment
        case "REQUEST_PAYMENT":  
            return {
                ...state,
                loadingPayment: true
            }
        case "SUCCESS_PAYMENT": 
            return {
                ...state,
                loadingPayment: false,
                successPayment: true
            }
        case "FAIL_PAYMENT": 
            return {
                ...state,
                loadingPayment: false,
            }
        case "RESET_PAYMENT":
            return {
                ...state,
                loadingPayment: false,
                successPayment: false
            }
        // Delivery
        case "REQUEST_DELIVERY": 
            return {
                ...state,
                loadingDelivery: true
            }
        case "SUCCESS_DELIVERY": 
            return {
                ...state,
                loadingDelivery: false,
                successDelivery: true
            }
        case "FAIL_DELIVERY": 
            return {
                ...state,
                loadingDelivery: false,
            }
        case "RESET_DELIVERY":
            return {
                ...state,
                loadingDelivery: false,
                successDelivery: false
            }
        default:
            return state;
    }
};

const useInvoice = () => {

    const navigate = useNavigate();

    /** User Context */
    const { state } = useContext(Context);
    const { userInfo } = state;

    /** Order Detail */
    const params = useParams();
    const { id: orderId } = params;

    const [{ loading, error, order, loadingPayment, successPayment, loadingDelivery, successDelivery }, dispatch] = useReducer(invoiceReducer, {
        loading: true,
        order: {},
        error: false,
        loadingPayment: false,
        successPayment: false
    });

    /** Paypal */
    const [{ pending }, paypalDispatch] = usePayPalScriptReducer();

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: { value: order.totalPrice }
            }]
        })
        .then((orderId) => {
            return orderId
        })
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(async function (details) {
            try {
                dispatch({ type: "REQUEST_PAYMENT" });

                const { data } = await axios.put(
                    `${PAYPAL_PAYMENT}/${orderId}/pay`, details, {
                        headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                    }
                );

                dispatch({
                    type: "SUCCESS_PAYMENT",
                    payload: data
                });

                toast.success('Successfully Paid');
            } catch (error) {
                dispatch({
                    type: "FAIL_PAYMENT",
                    payload: error.res && error.res.data.message 
                        ? error.res.data.message 
                        : error.message
                });
                navigate('*');
            }
        })
    };

    /** Error */
    const onError = (error) => {
        toast.error(error.message);
    };

    // fetch order details from api
    useEffect(() => {
        const fetchingInvoice = async () => {
            try {
                dispatch({ type: "REQUEST_INVOICE" });

                const { data } = await axios.get(
                    `${GET_ORDET_DETAIL}/${orderId}`, {
                        headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                    }
                );

                dispatch({
                    type: "SUCCESS_INVOICE",
                    payload: data
                });
            } catch (error) {
                dispatch({
                    type: "FAIL_INVOICE",
                    payload: error.message
                });
                navigate('*');
            }
        }

        if (!userInfo) {
            navigate('/login');
        };

        if (!order._id || successPayment || successDelivery || (order._id && order._id !== orderId)) {
            fetchingInvoice();

            if (successPayment) {
                dispatch({ type: "RESET_PAYMENT" });
            };

            if (successDelivery) {
                dispatch({ type: "RESET_DELIVERY" });
            };
        } else {
            // Paypal
            const loadingPaypal = async () => {
                const { data: clientId } = await axios.get(
                    `${GET_PAYPEL_KEYS}`, {
                        headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                    }
                );
 
                paypalDispatch({
                    type: "resetOptions",
                    value: {
                        'client-id': clientId,
                        currency: 'USD'
                    }
                });
                paypalDispatch({
                    type: "setLoadingStatus",
                    value: "pending"
                })
            };

            loadingPaypal();
        }
    }, [navigate, order, orderId, userInfo, paypalDispatch, successPayment, successDelivery]);

    // Deliver Order
    const deliverHandler = async () => {
        try {
            dispatch({ type: "REQUEST_DELIVERY" });

            const { data } = await axios.put(
                `${DELIVER_ORDER}/${order._id}/delivery`, {} , {
                    headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                }
            );

            dispatch({
                type: "SUCCESS_DELIVERY",
                payload: data
            });
            toast.success('Success Delivery');
            navigate('/orders-list');
        } catch (error) {   
            dispatch({ type: "FAIL_DELIVERY" });
            navigate('*');
        }
    };

    return {
        userInfo,
        orderId,
        loading,
        error,
        order,
        loadingPayment,
        loadingDelivery,
        pending,
        createOrder,
        onApprove,
        onError,
        deliverHandler
    };
};

export default useInvoice;