import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Context } from 'context/user-context'; 
import { STRIPE_PAYMENT } from 'constants/api';

const Stripe = ({ orderItems }) => {

    const params = useParams();
    const { id: orderId } = params;

    const { state } = useContext(Context);  
    const { userInfo } = state;

    const paymentHandler = async () => {
        try {
            const res = await axios.post(`${STRIPE_PAYMENT}/${orderId}`, {
                orderItems,
                userId: userInfo._id,
                headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            });
            
            localStorage.removeItem('cart');
            if (res.data.url) {
                window.location.href = res.data.url;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button 
            onClick={paymentHandler} 
            className="default-btn"
        >
            Check Out
        </button>
    )
};

export default Stripe;