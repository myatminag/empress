import React from 'react';
import { Link } from 'react-router-dom';

import EmptyCart from 'assets/empty_cart.svg';

const Empty = () => {
    return (
        <div>
            <img 
                src={EmptyCart}
                alt="" 
                className="mb-8 lg:w-[20%] mx-auto"
            />
            <div className="md:flex md:items-center md:justify-center md:gap-x-1">
                <p className="text-secondaryDark">
                    Cart is Empty!
                </p>
                <Link to='/shop'>
                    <p className="text-sm underline">
                        Click here to go shopping
                    </p>
                </Link>
            </div>
        </div>
    )
};

export default Empty;