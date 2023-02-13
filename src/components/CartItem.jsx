import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRegTrashAlt } from 'react-icons/fa';
import axios from 'axios';

import { Context } from 'context/user-context';
import { baseUrl } from 'utils/baseUrl';

const CartItem = ({ item }) => {

    const { dispatch: cartDispatch } = useContext(Context);

    const cartItemHandler = async (item, quantity) => {
        try {
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
            })
        } catch (error) {
            console.log(error);
        }
    };

    // remove cart item from cart
    const removeCartItemHandler = (item) => {
        cartDispatch({
            type: "REMOVE_FROM_CART",
            payload: item
        })
    }; 

    return (

        <div key={item._id} className="w-[100%] py-2 flex items-center lg:justify-between gap-x-3">
            <img 
                src={item.image} 
                alt={item.name} 
                className="w-[50%] lg:w-[20%]" 
            />
            <div className="py-1 flex flex-col gap-y-1 lg:w-[70%] lg:flex-row lg:items-center lg:justify-between">
                <p className="w-[150px] text-sm text-secondaryDark">
                    {item.brand}
                </p>
                <Link to={`/item/${item._id}`}>
                    <p className="w-[150px] text-sm text-ellipsis whitespace-nowrap overflow-hidden">
                        {item.name}
                    </p>
                </Link>
                <p className="text-sm">
                    ${item.price}
                </p>
                <div className="border w-[120px] mb-2 py-1 px-2 flex items-center justify-between">
                    <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => cartItemHandler(item, item.quantity + 1)}
                        disabled={item.quantity === item.inStock}
                        className="cursor-pointer"
                    >
                        +
                    </motion.button>
                    <span className="text-sm">
                        {item.quantity}
                    </span>
                    <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => cartItemHandler(item, item.quantity - 1)}
                        disabled={item.quantity === 1}
                        className="cursor-pointer"
                    >
                        -
                    </motion.button>
                </div>
                <FaRegTrashAlt size={18} onClick={() => removeCartItemHandler(item)} className="cursor-pointer" />
            </div>
        </div>
    )
}

export default CartItem;