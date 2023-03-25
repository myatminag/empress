import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from 'context/user-context';

const useCart = () => {

    const navigate = useNavigate();

    // get cart items from cart
    const { state } = useContext(Context);
    const { cart: { cartItems } } = state;

    // navigate to checkout page
    const orderHandler = () => {
        navigate('/login?redirect=/delivery');
    };

    return {
        cartItems,
        orderHandler
    };
};

export default useCart;