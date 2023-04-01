import React from 'react';
import { Link } from 'react-router-dom';

import useOrder from './hook';
import { WebTitle, SubTitle } from 'components';

const Order = () => {

    const {
        cart,
        loading,
        confirmOrderHandler
    } = useOrder();

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
                        {/* ----- cart items ----- */}
                        {cart.cartItems.map((item) => (
                            <>
                                <div className="w-[100%] py-2 flex items-center gap-x-3 lg:justify-between">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-[50%] lg:w-[20%]" 
                                    />
                                    <div className="w-[100%] flex flex-col gap-y-1 lg:w-[60%] lg:flex-row lg:items-center 
                                        lg:justify-between"
                                    >
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
                    {/* ----- delivery info ----- */}
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
                    {/* ----- total payment ----- */}
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
                            className="default-btn"
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