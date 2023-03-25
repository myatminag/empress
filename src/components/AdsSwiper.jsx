import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import { ads } from 'utils/data';

const AdsSwiper = () => {
    return (
        <div> 
            <Swiper
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                speed={1000}
                navigation={true}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {ads?.map(data => (
                    <SwiperSlide>
                        <div className="w-screen h-[20vh] lg:h-[70vh] mb-5 lg:mb-0">
                            <div className="max-w-[1240px] w-full h-full mx-auto px-3 lg:px-0 flex items-center justify-center 
                            lg:gap-x-6">
                                <div>
                                    <p className="mb-2 text-xs lg:text-base lg:mb-5">
                                        {data.title}
                                    </p>
                                    <motion.p 
                                        whileInView={{ y: [50, 0], opacity: [0, 1] }} 
                                        transition={{ delay: 0.3 }} 
                                        className="text-lg mb-2 lg:mb-5 lg:text-5xl lg:w-[450px] lg:leading-relaxed"
                                    >
                                        {data.text}
                                    </motion.p>
                                    <button className="px-4 py-2 lg:py-3 lg:w-[160px] text-white text-sm uppercase 
                                        bg-primaryDark border border-primaryDark hover:text-primaryDark hover:bg-white 
                                        transition duration-200"
                                    >
                                        Shop Now
                                    </button>
                                </div>
                                <div className="w-[350px] lg:w-[700px]">
                                    <img src={data.image} alt="" />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
};

export default AdsSwiper;