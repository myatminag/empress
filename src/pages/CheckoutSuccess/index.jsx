import React from 'react';
import { Link } from 'react-router-dom';
import { BsCheckCircle } from 'react-icons/bs';

import WebTitle from 'components/Helmet';

const CheckoutSuceess = () => {
    return (
        <div className="flex flex-col items-center my-[5rem]">
            <WebTitle title={"Checkout Success"} />
            <p className="mb-6 font-semibold text-lg">
                Your order has been received.
            </p>
            <BsCheckCircle size={30} className="text-green mb-6" />
            <p className="mb-4">
                Thank you for purchase!
            </p>
            <p className="px-3 mb-4 text-center lg:px-0">
                We'll email you order confirmation with details and delivery info.
            </p>
            <Link to="/shop">
                <button className="mb-4 px-4 py-2 text-sm text-white tracking-wider bg-primaryDark border 
                    border-primaryDark hover:text-primaryDark hover:bg-white transition duration-200"
                >
                    Continue Shopping
                </button>
            </Link>
            <Link to={'/orderhistory'}>
                <button className="text-sm underline">
                    Check order history
                </button>
            </Link>
        </div>
    )
};

export default CheckoutSuceess;