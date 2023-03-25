import React from 'react';

import { CartItem, Empty, SubTitle } from 'components';
import useCart from './hook';

const Cart = () => {

    const { cartItems, orderHandler } = useCart();

    return (
        <div className="w-[100%] px-3 py-6">
            <SubTitle name={"Shopping Cart"} />
            <div className="">
                {cartItems && cartItems.length > 0 ? (
                    <div className="grid lg:grid-cols-3 lg:gap-x-8">
                        <div className="lg:col-span-2">
                            {cartItems && cartItems.length > 0 && cartItems.map((item) => (
                                <>
                                    <CartItem item={item} />
                                    <hr /> 
                                </>
                            ))}
                        </div>
                        <div className="py-3 lg:col-span-1">
                            <div className="flex justify-between mb-2">
                                <p className="">
                                    Total Items:    
                                </p> 
                                <p className="">
                                    {cartItems.reduce((accu, curItem) => accu + curItem.quantity, 0)}
                                </p>
                            </div>
                            <div className="flex justify-between mb-2">
                                <p className="">
                                    Total Price:    
                                </p> 
                                <p className="">
                                    ${cartItems.reduce((accu, curItem) => accu + curItem.price * curItem.quantity, 0)}
                                </p>
                            </div>
                            <p className="mb-4 text-sm text-secondaryDark">
                                Taxes and delivery fees are calculated at checkout.
                            </p>
                            <button 
                                onClick={orderHandler}
                                disabled={cartItems.length === 0}
                                className="w-[100%] px-4 py-2 mb-6 text-sm text-white tracking-wider bg-primaryDark border 
                                border-primaryDark hover:text-primaryDark hover:bg-white transition duration-200"
                            >
                                Order
                            </button>
                        </div>
                    </div>
                ) : (
                    <Empty />
                )}
            </div>
        </div>
    )
};

export default Cart;