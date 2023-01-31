import { createContext, useReducer } from "react";

import { reducer } from "./user-reducer";

const INITIAL_STATE = { 
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    cart: {
        cartItems: JSON.parse(localStorage.getItem('cart')) || [],
        deliveryAddress: JSON.parse(localStorage.getItem('address')) || {},
    }
};

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const value = {
        state,
        dispatch
    };

    return (
        <Context.Provider value={value}>
            { children }
        </Context.Provider>
    )
}