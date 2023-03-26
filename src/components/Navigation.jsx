import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Squeeze as Hamburger } from "hamburger-react";
import { motion } from 'framer-motion';

import LoginIcon from './icons/LoginIcon';
import CartIcon from './icons/CartIcon';
import UserIcon from './icons/UserIcon';
import SettingIcon from './icons/SettingIcon';
import HistoryIcon from './icons/HistoryIcon';
import DashboardIcon from './icons/DashboardIcon';
import ItemListIcon from './icons/ItemListIcon';
import UserListIcon from './icons/UserListIcon';
import OrderListIcon from './icons/OrderListIcon';
import UploadIcon from './icons/UploadIcon';
import { Context } from 'context/user-context';
import Logout from 'components/Logout';
import SearchInput from 'components/SearchInput';
import SocialMedia from 'components/SocialMedia';

const Navigation = () => {

    const { state } = useContext(Context);
    const { userInfo, cart } = state;

    const [isOpen, setIsOpen] = useState(false); 

    // lock the scroll when side nav is opened
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; 
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const adminNavLink = [
        { id: '1', url: '/admin-dashboard', text: 'Dashboard', size: 21, icon: <DashboardIcon /> },
        { id: '2', url: '/items-list', text: 'Items List', size: 21, icon: <ItemListIcon /> },
        { id: '3', url: '/users-list', text: 'Users List', size: 21, icon: <UserListIcon /> },
        { id: '4', url: '/orders-list', text: 'Orders List', size: 21, icon: <OrderListIcon /> },
        { id: '5', url: '/upload-item', text: 'Upload Item', size: 21, icon: <UploadIcon /> },
    ];

    const clientNavLink = [
        { id: '1', url: '/profile', text: 'Account Info', size: 21, icon: <SettingIcon /> },
        { id: '2', url: '/orderhistory', text: 'Orders History', size: 21, icon: <HistoryIcon /> },
    ];

    return (
        <nav className='py-3 mb-4 lg:mb-0 lg:px-3 sticky z-40 top-0 left-0 border-b bg-white'> 
            <div className="mb-2 flex items-center justify-between lg:mb-0">
                <div className="flex items-center gap-x-3">
                    <div className="sticky z-[150] top-0 right-0 ">
                        <Hamburger 
                            toggled={isOpen} 
                            toggle={setIsOpen} 
                            size={23}
                        />
                    </div>
                    <Link to='/'>
                    <header className=" text-xl uppercase tracking-[0.8rem]">
                            Empress    
                        </header>
                    </Link> 
                </div>
                <div className="flex items-center gap-x-3 mr-3">
                    <div className="hidden lg:block">
                        <SearchInput />
                    </div>
                    <Link to='/shop'>
                        <p>
                            Shop
                        </p>
                    </Link>
                    {/* ----- cart items ----- */}
                    <div className="relative">
                        <Link to={'/cart'}>
                            <CartIcon />
                            {cart.cartItems.length > 0 && (
                                <div className="absolute top-[-11px] right-[-10px] z-30 text-white text-xs bg-[#03045e] 
                                    px-2 py-[1px] rounded-md"
                                >
                                    {cart.cartItems.reduce((accu, curItem) => accu + curItem.quantity, 0)}
                                </div>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
            <div className="block px-3 lg:hidden">
                <SearchInput />
            </div>
            {isOpen && (
                <div onClick={() => setIsOpen(prevState => !prevState)} className="bg-[rgba(0,0,0,0.6)] fixed z-[50] top-0 
                    left-0 w-screen h-screen ease-in"
                >
                    <motion.div 
                        initial={{ opacity: 0, x: "-30%" }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed z-[100] bg-white top-0 left-0 h-screen w-[250px] lg:w-[300px] overflow-hidden"
                    >
                        <div className="mt-[5rem]">
                            {userInfo ? (
                                <ul>
                                    <li className="border-t flex items-center gap-x-3 px-6 py-3 bg-primaryDark">
                                        <UserIcon />
                                        <p className="font-light text-white">
                                            {userInfo.username}
                                        </p>
                                    </li>
                                    {clientNavLink.map(link => (
                                            <Link key={link.id} to={link.url}>
                                                <li className="border-t flex items-center gap-x-3 px-6 py-3">
                                                    {link.icon}
                                                    <p className="font-light">
                                                        {link.text}
                                                    </p>
                                                </li>
                                            </Link>
                                        )
                                    )}
                                    <Logout />
                                </ul>
                            ) : (
                                <ul>
                                    <Link to='/login'>
                                        <li className="border-t flex items-center gap-x-3 px-6 py-3">
                                            <LoginIcon />
                                            <p className="font-light">
                                                Login / Register
                                            </p>
                                        </li>
                                    </Link>
                                </ul>
                            )}
                            {/* ----- admin ----- */}
                            {userInfo && userInfo.isAdmin && (
                                <ul>
                                    {adminNavLink.map(link => (
                                            <Link key={link.id} to={link.url}>
                                                <li className="border-t flex items-center gap-x-3 px-6 py-3">
                                                    {link.icon}
                                                    <p className="font-light">
                                                        {link.text}
                                                    </p>
                                                </li>
                                            </Link>
                                        )
                                    )}
                                </ul>
                            )}
                            <div className="px-6 fixed bottom-5">
                                <SocialMedia />
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </nav>
    )
};

export default Navigation;