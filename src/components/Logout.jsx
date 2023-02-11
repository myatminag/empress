import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import { Context } from 'context/user-context'; 

const Logout = () => {

    const navigate = useNavigate();

    const { dispatch: authDispatch } = useContext(Context);

    // logout
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
            <FiLogOut size={18} />
            <p className="font-light">
                Logout
            </p>
        </li>
    )
};

export default Logout;