import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

import { Context } from 'context/user-context';
import { baseUrl } from 'utils/baseUrl';

const Card = ({ items }) => {

    // get cart items from cart context 
    const { state, dispatch: cartDispatch } = useContext(Context); 
    const { cart: { cartItems } } = state;

    // add to cart function
    const addToCartHandler = async (item) => {
        try {
            const existingItem = cartItems.find((x) => x._id === items._id);
            const quantity = existingItem ? existingItem.quantity + 1 : 1; 
            const { data } = await axios.get(
                `${baseUrl}/server/items/item/${item._id}`
            )

            if (data.inStock < quantity) {
                window.alert('Out of Stock')
            };

            cartDispatch({
                type: "ADD_TO_CART",
                payload: {
                    ...item,
                    quantity
                }
            });
        } catch (error) {
            console.log(error); 
        }
    };

    return ( 
        <div key={items._id} className="p-3 bg-secondaryWhite rounded-md">
            <Link to={`/item/${items._id}`}>
                <motion.img 
                    whileHover={{ scale: 1.1 }}
                    src={items.image}
                    alt={items.name}
                    className="my-3 w-[90%] lg:w-[80%] mx-auto"
                />
            </Link>
            <hr />
            <div className="w-[100%] mt-3">
                <div className="mb-3">
                    <p className="mb-1 text-sm text-secondaryDark">
                        {items.brand}
                    </p>
                    <header className="mb-1 text-sm text-ellipsis whitespace-nowrap overflow-hidden">
                        {items.name}
                    </header>
                    {items.inStock ? (
                        <p className="text-sm">
                            $ {items.price}
                        </p>
                    ) : (
                        <p className="text-sm text-error">
                            Unavailable
                        </p>
                    )}
                </div>
                {items.inStock ? (
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCartHandler(items)}
                        className="w-[100%] py-1 px-3 text-xs text-primaryDark uppercase border rounded-md"
                    >
                        Add To Cart
                    </motion.button>
                ) : (
                    <button
                        disabled
                        className="w-[100%] py-1 px-3 text-xs text-error uppercase border rounded-md"
                    >
                        Out Of Stock
                    </button>
                )}
            </div>
        </div>
    )
};

export default Card;