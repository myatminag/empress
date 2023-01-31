import React from 'react';
import { MdOutlineEmail, MdOutlinePhone, MdOutlineLocationOn } from 'react-icons/md';
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'; 

const Footer = () => {
    return (
        <section className="px-3 pt-12 pb-5 lg:px-6 bg-primaryDark"> 
            <div className="mb-10 lg:flex lg:items-start lg:justify-between">
                <div className="mb-8 lg:col-span-1">
                    <header className="text-white text-4xl font-semibold mb-4">
                        Empress
                    </header>
                    <ul className="">
                        <li className="flex items-center gap-x-1 mb-3 text-[#adb5bd] hover:text-white transition-all duration-150 cursor-pointer">
                            <MdOutlineEmail size={20} />
                            <p className="">
                                empress@gmail.com
                            </p>
                        </li>
                        <li className="flex items-center gap-x-1 mb-3 text-[#adb5bd] hover:text-white transition-all duration-150 cursor-pointer">
                            <MdOutlinePhone size={20} />
                            <p className="">
                                +95-9123-456-789
                            </p>
                        </li>
                        <li className="flex items-center gap-x-1 mb-3 text-[#adb5bd] hover:text-white transition-all duration-150 cursor-pointer">
                            <MdOutlineLocationOn size={20} />
                            <p className="">
                                Yangon, Myanmar
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="mb-8 lg:col-span-1">
                    <header className="text-white text-xl mb-2">
                        Social Media
                    </header>
                    <ul className="">
                        <li className="text-[#adb5bd] mb-3 hover:text-white transition-all duration-150 cursor-pointer">
                            Facebook
                        </li>
                        <li className="text-[#adb5bd] mb-3 hover:text-white transition-all duration-150 cursor-pointer">
                            Instagram
                        </li>
                        <li className="text-[#adb5bd] mb-3 hover:text-white transition-all duration-150 cursor-pointer">
                            Youtube
                        </li>
                        <li className="text-[#adb5bd] mb-3 hover:text-white transition-all duration-150 cursor-pointer">
                            Pinterest
                        </li>
                    </ul>
                </div>
                <div className="mb-8 lg:col-span-1">
                    <header className="text-white text-xl mb-2">
                        My Account
                    </header>
                    <ul className="">
                        <li className="text-[#adb5bd] mb-3 hover:text-white transition-all duration-150 cursor-pointer">
                            Refund policy
                        </li>
                        <li className="text-[#adb5bd] mb-3 hover:text-white transition-all duration-150 cursor-pointer">
                            Login
                        </li>
                        <li className="text-[#adb5bd] mb-3 hover:text-white transition-all duration-150 cursor-pointer">
                            Order status
                        </li>
                        <li className="text-[#adb5bd] mb-3 hover:text-white transition-all duration-150 cursor-pointer">
                            Site map
                        </li>
                    </ul>
                </div>
                <div className="mb-8 lg:col-span-1">
                    <header className="text-white text-xl mb-2">
                        Information
                    </header>
                    <ul className="">
                        <li className="text-[#adb5bd] mb-3 hover:text-white transition-all duration-150 cursor-pointer">
                            Terms & Conditions
                        </li>
                        <li className="text-[#adb5bd] mb-3 hover:text-white transition-all duration-150 cursor-pointer">
                            Contact Us
                        </li>
                        <li className="text-[#adb5bd] mb-3 hover:text-white transition-all duration-150 cursor-pointer">
                            About Us
                        </li>
                        <li className="text-[#adb5bd] mb-3 hover:text-white transition-all duration-150 cursor-pointer">
                            FAQ
                        </li>
                        <li className="text-[#adb5bd] mb-3 hover:text-white transition-all duration-150 cursor-pointer">
                            Customer Services
                        </li>
                    </ul>
                </div>
                <div className="lg:col-span-1">
                    <header className="text-white text-3xl mb-2">
                        Subscribe
                    </header>
                    <div className="mb-4">
                        <p className="text-[#adb5bd] text-sm mb-2 cursor-pointer">
                            Subscribe to receive updates on our store and special offers
                        </p>
                        <input 
                            type="email" 
                            placeholder="Your email address"
                            className="w-[100%] bg-[#2f313a] text-white rounded-md py-3 px-3 text-sm focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-x-2">
                        <FaTwitter size={45} className="bg-[#2f313a] text-white px-1 py-3 rounded-[50px] cursor-pointer" />
                        <FaFacebook size={45} className="bg-[#2f313a] text-white px-1 py-3 rounded-[50px] cursor-pointer" />
                        <FaInstagram size={45} className="bg-[#2f313a] text-white px-1 py-3 rounded-[50px] cursor-pointer" />
                        <FaYoutube size={45} className="bg-[#2f313a] text-white px-1 py-3 rounded-[50px] cursor-pointer" />
                    </div>
                </div>
            </div>
            <p className="text-center text-sm text-[#adb5bd]">
                © Empress Store. All rights reserved
            </p>
        </section>
    )
};

export default Footer;