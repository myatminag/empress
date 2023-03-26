import React from 'react';

import EmailIcon from './icons/EmailIcon';
import PhoneIcon from './icons/PhoneIcon';
import LocationIcon from './icons/LocationIcon';

const Footer = () => {
    return (
        <section className="px-3 pt-12 pb-5 lg:px-6 bg-primaryDark"> 
            <div className="mb-10 lg:flex lg:items-start lg:justify-evenly">
                <div className="mb-8 lg:col-span-1">
                    <header className="text-white text-4xl font-semibold mb-4">
                        Empress
                    </header>
                    <ul className="">
                        <li className="footer-shop-info">
                            <EmailIcon />
                            <p className="">
                                empress@gmail.com
                            </p>
                        </li>
                        <li className="footer-shop-info">
                            <PhoneIcon />
                            <p className="">
                                +95-9123-456-789
                            </p>
                        </li>
                        <li className="footer-shop-info">
                            <LocationIcon />
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
                        <li className="footer-text">
                            Facebook
                        </li>
                        <li className="footer-text">
                            Instagram
                        </li>
                        <li className="footer-text">
                            Youtube
                        </li>
                        <li className="footer-text">
                            Pinterest
                        </li>
                    </ul>
                </div>
                <div className="mb-8 lg:col-span-1">
                    <header className="text-white text-xl mb-2">
                        Information
                    </header>
                    <ul className="">
                        <li className="footer-text">
                            Terms & Conditions
                        </li>
                        <li className="footer-text">
                            Contact Us
                        </li>
                        <li className="footer-text">
                            About Us
                        </li>
                        <li className="footer-text">
                            FAQ
                        </li>
                        <li className="footer-text">
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
                            className="w-[100%] bg-[#2f313a] text-white rounded-md p-3 text-sm focus:outline-none"
                        />
                    </div>
                    <button className="bg-[#2f313a] text-white p-3 rounded-md text-sm">
                        Subscribe
                    </button>
                </div>
            </div>
            <p className="text-center text-sm text-[#adb5bd]">
                © Empress Store. All rights reserved
            </p>
        </section>
    )
};

export default Footer;