import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from './icons/LogoutIcon';

import { Context } from 'context/user-context'; 

const Logout = () => {

    const navigate = useNavigate();

    const { dispatch: authDispatch } = useContext(Context);

    // logout and remove all related localstorage
    const logoutHandler = () => { 
        authDispatch({
            type: "LOGOUT"
        });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('cart');
        localStorage.removeItem('address');
        localStorage.removeItem('paymentMethod'); 
        navigate('/')
    };

    return (
        <li 
            onClick={logoutHandler}
            className="border-t flex items-center gap-x-3 px-6 py-3 cursor-pointer"
        >
            <LogoutIcon />
            <p className="font-light">
                Logout
            </p>
        </li>
    )
};

export default Logout;