import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from 'context/user-context';

const useDeliveryInfo = () => {
    const navigate = useNavigate(); 

    /** Deliver Context */
    const { state, dispatch: addressDispatch } = useContext(Context);
    const { userInfo, cart : { deliveryAddress } } = state;

    const [fullName, setFullName] = useState(deliveryAddress.fullName || "");
    const [phone, setPhone] = useState(deliveryAddress.phone || '');
    const [addressState, setaddressState] = useState(deliveryAddress.addressState || "");
    const [city, setCity] = useState(deliveryAddress.city || "");
    const [address, setAddress] = useState(deliveryAddress.address || "");

    /** delivery form */
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

    /** if user does not login redirect to login page */
    useEffect(() => {
        if (!userInfo) {
            navigate('login?redirect=/shipping');
        }
    }, [userInfo, navigate]);

    return {
        fullName, setFullName,
        phone, setPhone,
        addressState, setaddressState,
        city, setCity,
        address, setAddress,
        deliveryFormHandler
    }
};

export default useDeliveryInfo;