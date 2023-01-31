import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Context } from 'context/user-context';
import { WebTitle, SubTitle } from 'components';

const Delivery = () => {

    const navigate = useNavigate(); 

    /** Deliver Context */
    const { state, dispatch: addressDispatch } = useContext(Context);
    const { userInfo, cart : { deliveryAddress } } = state;

    const [fullName, setFullName] = useState(deliveryAddress.fullName || "");
    const [phone, setPhone] = useState(deliveryAddress.phone || '');
    const [addressState, setaddressState] = useState(deliveryAddress.addressState || "");
    const [city, setCity] = useState(deliveryAddress.city || "");
    const [address, setAddress] = useState(deliveryAddress.address || "");

    /** Delivery Form */
    const deliveryFormHandler = (e) => {
        e.preventDefault();

        addressDispatch({
            type: "SAVE_DELIVERY_ADDRESS",
            payload: {
                fullName, phone, addressState, city, address
            }
        });

        localStorage.setItem('address', JSON.stringify({
            fullName, phone, addressState, city, address
        }));

        navigate('/order');
    };

    /** If user login redirect to current page */
    useEffect(() => {
        if (!userInfo) {
            navigate('login?redirect=/shipping');
        }
    }, [userInfo, navigate])

    return (
        <section className="px-3 py-6 lg:px-6">
            <WebTitle title={"Delivery Info"} />
            <SubTitle name={"Delivery Info"} />
            <div className="md:w-[450px] md:mx-auto">
                <form onSubmit={deliveryFormHandler}>
                    <div className="mb-4">
                        <label className="block mb-2">
                            Full Name
                        </label>
                        <input 
                            type="text"
                            name="fullName"
                            value={fullName}
                            required
                            placeholder="Please enter your full name"
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-[100%] px-4 py-2 rounded-md border text-sm placeholder:text-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">
                            Phone Number
                        </label>
                        <input 
                            type="text"
                            name="phone"
                            value={phone}
                            required
                            placeholder="Please enter phone number"
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-[100%] px-4 py-2 rounded-md border text-sm placeholder:text-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">
                            State
                        </label>
                        <input 
                            type="text" 
                            name="state"
                            value={addressState}
                            required
                            placeholder="Please enter your state"
                            onChange={(e) => setaddressState(e.target.value)}
                            className="w-[100%] px-4 py-2 rounded-md border text-sm placeholder:text-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">
                            City
                        </label>
                        <input 
                            type="text" 
                            name="city"
                            value={city}
                            required
                            placeholder="Please enter your city"
                            onChange={(e) => setCity(e.target.value)}
                            className="w-[100%] px-4 py-2 rounded-md border text-sm placeholder:text-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block mb-2">
                            Address
                        </label>
                        <textarea 
                            type="text" 
                            name="address"
                            value={address}
                            required
                            placeholder="Please enter your address"
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-[100%] h-[150px] px-4 py-2 rounded-md border text-sm placeholder:text-sm focus:outline-none"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-[100%] px-4 py-2 mb-6 text-sm text-white tracking-wider bg-primaryDark border border-primaryDark hover:text-primaryDark hover:bg-white transition duration-200"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </section>
    )
};

export default Delivery;