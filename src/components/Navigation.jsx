import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Squeeze as Hamburger } from "hamburger-react";
import { motion } from 'framer-motion';
import { FcAbout } from 'react-icons/fc';
import { AiTwotoneCustomerService } from 'react-icons/ai';
import { FaRegListAlt } from 'react-icons/fa';
import { FiUser, FiSettings, FiLogIn, FiShoppingCart, FiUsers } from 'react-icons/fi';
import { MdOutlineAdminPanelSettings, MdOutlineBorderColor, MdOutlineProductionQuantityLimits, MdOutlineHistory } from 'react-icons/md';

import { Context } from 'context/user-context';
import Logout from 'components/Logout';
import SearchInput from 'components/SearchInput';
import SocialMedia from 'components/SocialMedia';

const Navigation = () => {

    const { state } = useContext(Context);
    const { userInfo, cart } = state;

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; 
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const adminNavLink = [
        { id: '1', url: '/admin-dashboard', text: 'Dashboard', size: 21, icon: MdOutlineAdminPanelSettings },
        { id: '2', url: '/items-list', text: 'Items List', size: 21, icon: MdOutlineProductionQuantityLimits },
        { id: '3', url: '/users-list', text: 'Users List', size: 21, icon: FiUsers },
        { id: '4', url: '/orders-list', text: 'Orders List', size: 21, icon: FaRegListAlt },
        { id: '5', url: '/upload-item', text: 'Upload Item', size: 21, icon: MdOutlineBorderColor },
    ];

    const clientNavLink = [
        { id: '1', url: '/profile', text: 'Account Info', size: 21, icon: FiSettings },
        { id: '2', url: '/orderhistory', text: 'Orders History', size: 21, icon: MdOutlineHistory },
        { id: '3', url: '/about', text: 'About Us', size: 21, icon: FcAbout },
        { id: '4', url: '/services', text: 'Services', size: 21, icon: AiTwotoneCustomerService },
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
                    <div className="relative">
                        <Link to={'/cart'}>
                            <FiShoppingCart size={22} />
                            {cart.cartItems.length > 0 && (
                                <div className="absolute top-[-11px] right-[-10px] z-30 text-white text-xs bg-[#03045e] px-2 py-[1px] rounded-md">
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
                <div onClick={() => setIsOpen(prevState => !prevState)} className="bg-[rgba(0,0,0,0.6)] fixed z-[50] top-0 left-0 w-screen h-screen ease-in">
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
                                        <FiUser size={21} color="white" />
                                        <p className="font-light text-white">
                                            {userInfo.user.username}
                                        </p>
                                    </li>
                                    {clientNavLink.map(link => {
                                        const Icons = link.icon;
                                        return (
                                            <Link key={link.id} to={link.url}>
                                                <li className="border-t flex items-center gap-x-3 px-6 py-3">
                                                    <Icons size={link.size} />
                                                    <p className="font-light">
                                                        {link.text}
                                                    </p>
                                                </li>
                                            </Link>
                                        )
                                    })}
                                    <Logout />
                                </ul>
                            ) : (
                                <ul>
                                    <Link to='/login'>
                                        <li className="border-t flex items-center gap-x-3 px-6 py-3">
                                            <FiLogIn size={18} />
                                            <p className="font-light">
                                                Login / Register
                                            </p>
                                        </li>
                                    </Link>
                                    <Link to='/about'>
                                        <li className="border-t flex items-center gap-x-3 px-6 py-3">
                                            <FcAbout size={18} />
                                            <p className="font-light">
                                                About Us
                                            </p>
                                        </li>
                                    </Link>
                                    <Link to='/services'>
                                        <li className="border-t flex items-center gap-x-3 px-6 py-3">
                                            <AiTwotoneCustomerService size={18} />
                                            <p className="font-light">
                                                Services
                                            </p>
                                        </li>
                                    </Link>
                                </ul>
                            )}
                            {userInfo && userInfo.user.isAdmin && (
                                <ul>
                                    {adminNavLink.map(link => {
                                        const Icons = link.icon;
                                        return (
                                            <Link key={link.id} to={link.url}>
                                                <li className="border-t flex items-center gap-x-3 px-6 py-3">
                                                    <Icons size={link.size} />
                                                    <p className="font-light">
                                                        {link.text}
                                                    </p>
                                                </li>
                                            </Link>
                                        )
                                    })}
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