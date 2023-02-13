import React, { useContext, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { orderReducer } from './reducer';
import { Context } from 'context/user-context';
import { WebTitle, SubTitle } from 'components';
import { baseUrl } from 'utils/baseUrl';
import { accessToken } from 'utils/token';

const Order = () => {

    const navigate = useNavigate();

    const { state, dispatch: orderDispatch } = useContext(Context); 
    const { cart } = state;

    /**
     * item price
     * delivery price
     * tax price
     * total price
     */
    const round = (num) => Math.round(num * 100 + Number.EPSILON) / 100  //123.456 => 123.45

    cart.itemsPrice =  round(
        cart.cartItems.reduce((accu, curItem) => accu + curItem.quantity * curItem.price, 0)
    );
    cart.deliveryPrice = cart.itemsPrice > 3000 ? round(0) : round(2.5);
    cart.taxPrice = round(0.005 * cart.itemsPrice)
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
                `${baseUrl}/server/orders/new/`, orderData, {
                    headers: { authorization: `Bearer ${accessToken}` }
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

    return (
        <section className="px-3 py-6 lg:px-6">
            <WebTitle title={"Order"} />
            <SubTitle name={"Order Summary"} />
            <div className="grid lg:grid-cols-3 lg:gap-x-8">
                <div className="lg:col-span-2">
                    <div className="mb-3 flex items-center justify-between">
                        <header className="font-semibold">
                            Items you order
                        </header>
                        <Link to='/cart'>
                            <p className="text-error underline">
                                Edit
                            </p>
                        </Link>
                    </div>
                    <div className="">
                        {cart.cartItems.map((item) => (
                            <>
                                <div className="w-[100%] py-2 flex items-center gap-x-3 lg:justify-between">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-[50%] lg:w-[20%]" 
                                    />
                                    <div className="w-[100%] flex flex-col gap-y-1 lg:w-[60%] lg:flex-row lg:items-center lg:justify-between">
                                        <p className="w-[150px] text-sm text-secondaryDark">
                                            {item.brand}
                                        </p>
                                        <p className="w-[150px] text-sm">
                                            {item.name}
                                        </p>
                                        <p className="text-sm">
                                            <span className="">
                                                Qty: {" "}     
                                            </span> 
                                            {item.quantity}
                                        </p>
                                        <p className="text-sm">
                                            <span className="">
                                                ${" "}     
                                            </span> 
                                            {item.price}
                                        </p>
                                    </div>
                                </div>
                                <hr className="my-3" />
                            </>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="mb-2 rounded-md">
                        <div className="mb-3 flex items-center justify-between">
                            <header className="font-semibold">
                                Delivery Info
                            </header>
                            <Link to='/delivery'>
                                <p className="text-error underline">
                                    Edit
                                </p>
                            </Link>
                        </div>
                        <div className="mb-2 grid grid-cols-3">
                            <p className="col-span-1">
                                Name: {" "}     
                            </p> 
                            <p className="col-span-2">
                                {cart.deliveryAddress.fullName}
                            </p>
                        </div>
                        <div className="mb-2 grid grid-cols-3">
                            <p className="col-span-1">
                                Phone: {" "}     
                            </p> 
                            <p className="col-span-2">
                                {cart.deliveryAddress.phone}
                            </p>
                        </div>
                        <div className="mb-2 grid grid-cols-3">
                            <p className="col-span-1">
                                State: {" "}     
                            </p> 
                            <p className="col-span-2">
                                {cart.deliveryAddress.addressState}
                            </p>
                        </div>
                        <div className="mb-2 grid grid-cols-3">
                            <p className="col-span-1">
                                City: {" "}     
                            </p> 
                            <p className="col-span-2">
                                {cart.deliveryAddress.city}
                            </p>
                        </div>
                        <div className="grid grid-cols-3">
                            <p className="col-span-1">
                                Address: {" "}
                            </p> 
                            <p className="col-span-2">
                                {cart.deliveryAddress.address}
                            </p>
                        </div>
                    </div>
                    <hr className="my-3" />
                    <div>
                        <header className="mb-3 font-semibold">
                            Payment Info  
                        </header>
                        <div className="mb-2 flex justify-between items-center">
                            <p className="">
                                Items Price: {" "}     
                            </p> 
                            <p>
                                ${cart.itemsPrice.toFixed(2)}
                            </p>
                        </div>
                        <div className="mb-2 flex justify-between items-center">
                            <p className="">
                                Delivery Fee: {" "}     
                            </p> 
                            <p>
                                ${cart.deliveryPrice}
                            </p>
                        </div>
                        <div className="mb-2 flex justify-between items-center">
                            <p className="">
                                Tax Fee (0.005%): {" "}    
                            </p> 
                            <p>
                                ${cart.taxPrice}
                            </p>
                        </div>
                        <hr className="mb-2" />
                        <div className="mb-4 flex justify-between items-center">
                            <p className="">
                                Total Price: {" "}     
                            </p> 
                            <p>
                                ${cart.totalPrice.toFixed(2)}
                            </p>
                        </div>
                        <button 
                            type="button"
                            onClick={confirmOrderHandler}
                            className="w-[100%] px-4 py-2 mb-6 text-sm text-white tracking-wider bg-primaryDark border border-primaryDark hover:text-primaryDark hover:bg-white transition duration-200"
                        >
                            Confirm Order
                        </button>
                        {loading && (
                            <p className="text-sm font-semibold text-center">
                                Loading...
                            </p> 
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Order;