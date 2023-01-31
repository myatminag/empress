import React from 'react';
import { motion } from 'framer-motion';

const Featured = () => {
    return (   
        <div className="px-3 pb-12 lg:px-8 grid grid-cols-1 gap-y-5 lg:grid-cols-3 lg:gap-x-6">
            <div className="flex items-center justify-center bg-[#eee7e5]">
                <p className="text-white ml-6 font-semibold text-3xl">
                    Choose the fully immersive
                </p>
                <motion.img 
                    whileHover={{ scale: 1.1 }}
                    src="/images/beats.png" 
                    alt="feature-ads" 
                    className="w-[200px] lg:w-[280px]"
                />
            </div>
            <div className="flex items-center bg-[#c4cdda]">
                <p className="text-white ml-6 font-semibold text-3xl">
                    Next gen of ipad & ipad air
                </p>
                <motion.img 
                    whileHover={{ scale: 1.1 }}
                    src="/images/ipad.png" 
                    alt="feature-ads" 
                    className="w-[200px] lg:w-[280px]"
                />
            </div>
            <div className="flex items-center bg-[#e4e4e4]">
                <p className="text-white ml-6 font-semibold text-3xl">
                    Stream live tv & media
                </p>
                <motion.img 
                    whileHover={{ scale: 1.1 }}
                    src="/images/tv.png" 
                    alt="feature-ads" 
                    className="w-[200px] lg:w-[280px]"
                />
            </div>
        </div>
    )
};

export default Featured