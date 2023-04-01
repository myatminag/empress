import { useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Context } from 'context/user-context';
import { POST_ORDER } from 'constants/api';

/* ----- reducer ----- */
const orderReducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_ORDER":
            return {
                ...state,
                loading: true,
            }
        case 'SUCCESS_ORDER':
            return {
                ...state,
                loading: false,
            }
        case 'FAIL_ORDER':
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    };
};

const useOrder = () => {

    const navigate = useNavigate();

    const { state, dispatch: orderDispatch } = useContext(Context); 
    const { cart } = state;

    // price helper function
    const round = (num) => Math.round(num * 100 + Number.EPSILON) / 100  //123.456 => 123.45

    // item price
    cart.itemsPrice =  round(
        cart.cartItems.reduce((accu, curItem) => accu + curItem.quantity * curItem.price, 0)
    );

    // delivery price
    cart.deliveryPrice = cart.itemsPrice > 3000 ? round(0) : round(2.5);

    // tax price
    cart.taxPrice = round(0.005 * cart.itemsPrice);

    // total price
    cart.totalPrice = cart.itemsPrice + cart.deliveryPrice + cart.taxPrice;

    const [{ loading }, dispatch] = useReducer(orderReducer, {
        loading: false,
    });

    // post order to api
    const confirmOrderHandler = async () => {
        const orderData = {
            orderItems: cart.cartItems,
            deliveryAddress: cart.deliveryAddress,
            itemsPrice: cart.itemsPrice, 
            deliveryPrice: cart.deliveryPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }

        try {
            const { data } = await axios.post(
                `${POST_ORDER}/`, orderData, {
                    headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                }
            );

            orderDispatch({ type: "CLEAR_CART" });

            dispatch({ type: "SUCCESS_ORDER" });

            navigate(`/order/${data.order._id}`);
        } catch (error) {
            dispatch({ type: "FAIL_ORDER" });
            navigate('*');
        }   
    };

    return {
        cart,
        loading,
        confirmOrderHandler
    }
}

export default useOrder;