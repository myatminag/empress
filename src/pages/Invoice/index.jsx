import React, { useEffect, useReducer, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import axios from 'axios';

import { Context } from 'context/user-context';
import { invoiceReducer } from './reducer'; 
import { Loading, Stripe, WebTitle } from 'components';
import { baseUrl } from 'utils/baseUrl';
import { accessToken } from 'utils/token';

const Invoice = () => {

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
                    `${baseUrl}/server/orders/${orderId}/pay`, details, {
                        headers: { authorization: `Bearer ${accessToken}` }
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
                    `${baseUrl}/server/orders/${orderId}`, {
                        headers: { authorization: `Bearer ${accessToken}` }
                    }
                );

                dispatch({
                    type: "SUCCESS_INVOICE",
                    payload: data
                })
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
                    `${baseUrl}/server/keys/paypal`, {
                        headers: { authorization: `Bearer ${accessToken}` }
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
                `${baseUrl}/server/orders/${order._id}/delivery`, {} , {
                    headers: { authorization: `Bearer ${accessToken}` }
                }
            );

            dispatch({
                type: "SUCCESS_DELIVERY",
                payload: data
            });
            toast.success('Success Delivery');
        } catch (error) {   
            dispatch({ type: "FAIL_DELIVERY" });
            navigate('*');
        }
    };

    return (
        <section className="px-3 py-6 lg:px-6">
            {loading ? (
                <Loading />
            ) : error ? (
                <p className="text-sm font-semibold text-center text-[#ef233c]">
                    {error}
                </p> 
            ) : (
                <div>
                    <WebTitle title={`Invoice ${orderId}`} />
                    <div>
                        {userInfo.isAdmin ? (
                            <div>
                                <p className="mb-4 text-lg">
                                    Order Confirmed!
                                </p>
                                <p className="mb-2">
                                    Customer {order.deliveryAddress.fullName},
                                </p>
                                {order.isPaid ? (
                                    <p>
                                        Order <span className="underline font-medium">{orderId}</span> has been paid.
                                    </p>
                                ) : (
                                    <p>
                                        Order <span className="underline font-medium">{orderId}</span> has not paid.
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div>
                                <p className="mb-4 text-lg">
                                    Your Order Confirmed!
                                </p>
                                <p className="mb-2">
                                    Hi {order.deliveryAddress.fullName},
                                </p>
                                <p className="">
                                    Your order <span className="underline font-medium">{orderId}</span> has been confirmed and will be delivered soon.
                                </p>
                            </div>
                        )}
                        <hr className="my-6" />
                        <div className="grid grid-cols-2 lg:grid-cols-7">
                            <div className="mb-2 lg:mb-0">
                                <p className="mb-1 font-semibold">
                                    Order Date
                                </p>
                                <p className="">
                                    {new Date(order.createdAt).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" })}
                                </p>
                            </div>
                            <div className="mb-2 lg:mb-0">
                                <p className="mb-1 font-semibold">
                                    Paid At
                                </p>
                                {order.isPaid ? (
                                    <p className="text-blue">
                                        {new Date(order.paidAt).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" })}
                                    </p>
                                ) : (
                                    <p className="text-error">
                                        Not Paid yet
                                    </p>
                                )}
                            </div>
                            <div className="mb-2 lg:mb-0">
                                <p className="mb-1 font-semibold">
                                    Delivered At
                                </p>
                                {order.isDelivered ? (
                                    <p className="text-blue">
                                        {new Date(order.deliveredAt).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" })}
                                    </p>
                                ) : (
                                    <p className="text-error">
                                        Not Delivered yet
                                    </p>
                                )}
                            </div>
                            <div className="mb-2 lg:mb-0">
                                <p className="mb-1 font-semibold">
                                    Phone
                                </p>
                                <p className="">
                                    {order.deliveryAddress.phone}
                                </p>
                            </div>
                            <div className="mb-2 lg:mb-0">
                                <p className="mb-1 font-semibold">
                                    City
                                </p>
                                <p className="">
                                    {order.deliveryAddress.city}
                                </p>
                            </div>
                            <div className="mb-2 lg:mb-0">
                                <p className="mb-1 font-semibold">
                                    State
                                </p>
                                <p className="">
                                    {order.deliveryAddress.addressState}
                                </p>
                            </div>
                            <div className="">
                                <p className="mb-1 font-semibold">
                                    Address
                                </p>
                                <address className="">
                                    {order.deliveryAddress.address}
                                </address>
                            </div>
                        </div>
                        <hr className="my-6" />
                        <div>
                            {order.orderItems.map((item) => (
                                <div className="mb-5 grid grid-cols-2 lg:grid-cols-4">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-[80%] lg:w-[50%]" 
                                    /> 
                                    <div>
                                        <p className="mb-2 text-sm text-secondaryDark">
                                            {item.brand}
                                        </p>
                                        <p className="mb-2">
                                            {item.name}
                                        </p>
                                        <p className="">
                                            {item.modelName}
                                        </p>
                                    </div>
                                    <p className="mb-1 mt-3 text-center lg:mt-0">
                                        <span className="">
                                            Qty: {" "}     
                                        </span> 
                                        ( {item.quantity} )  
                                    </p>
                                    <p className="mb-1 mt-3 text-center lg:mt-0">
                                        <span className="">
                                            $: {" "}     
                                        </span> 
                                        {item.price}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <hr className="my-6" />
                        <div className="mb-3 flex justify-between items-center">
                            <p className="">
                                Items Price: {" "}     
                            </p> 
                            <p className="">
                                ${order.itemsPrice.toFixed(2)}
                            </p>
                        </div>
                        <div className="mb-3 flex justify-between items-center">
                            <p className="">
                                Delivery Fee: {" "}     
                            </p> 
                            <p className="">
                                ${order.deliveryPrice}
                            </p>
                        </div>
                        <div className="mb-6 flex justify-between items-center">
                            <p className="">
                                Tax Fee: {" "}    
                            </p> 
                            <p className="">
                                ${order.taxPrice}
                            </p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="">
                                Total Payment: {" "}     
                            </p> 
                            <p className="">
                                ${order.totalPrice.toFixed(2)}
                            </p>
                        </div>
                        <hr className="my-6" />
                        <div className="grid lg:grid-cols-3">
                            <div className="mb-4 lg:mb-0 lg:col-span-2">
                                <p className="mb-3">
                                    After processing payment, we'll send you delivery confirmation. We appreciate your business, and hope you
                                    enjoy your purchase.
                                </p>
                                <p className="mb-1">
                                    Thank you!
                                </p>
                                <p>
                                    Empress Digital Store 
                                </p>
                            </div>
                            <div className="lg:col-span-1">
                                {userInfo.isAdmin !== true && !order.isPaid && (
                                    <div> 
                                        {pending ? (
                                            <p className="text-sm font-semibold text-center">
                                                Loading...
                                            </p>
                                        ) : (
                                            <div className="relative z-[10]">
                                                <Stripe orderItems={order.orderItems} />
                                                <Divider sx={{ marginY: "14px" }}>
                                                    <Chip label="OR" />
                                                </Divider>
                                                <PayPalButtons 
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                />
                                            </div>
                                        )}
                                        {loadingPayment &&  (
                                            <p className="text-sm font-semibold text-center">
                                                Loading...
                                            </p>
                                        )}
                                    </div>
                                )}
                                {userInfo.isAdmin === true && order.isPaid && !order.isDelivered && (
                                    <motion.div whileTap={{ scale: 0.95 }}>
                                        {loadingDelivery && (
                                            <p className="text-sm font-semibold text-center">
                                                Loading...
                                            </p>
                                        )}
                                        <button 
                                            type="button"
                                            onClick={deliverHandler}
                                            className="w-[100%] px-6 py-1 text-white text-sm bg-primaryDark border border-primaryDark hover:text-primaryDark hover:bg-white transition duration-200"
                                        >
                                            Deliver Order
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
};

export default Invoice;