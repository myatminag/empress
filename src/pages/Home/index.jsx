import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import API from './hook';
import { Card, AdsSwiper, Brand, Featured, Waiting } from 'components';

const Item = () => {
    
    const navigate = useNavigate();

    const { isLoading, error, data } = API();

    if (isLoading) return <Waiting />;
    
    if (error) return navigate('*');

    return (
        <section className="">  
            <AdsSwiper />
            <Featured />
            <div className="px-3 py-6 mb-8 lg:px-[8%]">
                <p className="mb-3 text-center text-xl lg:text-3xl">
                    Macbooks Series
                </p>
                <p className="mb-12 text-center">
                    Check & Get Your Desired Product!
                </p>
                <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-3">
                    {data.reverse().filter(item => item.category === "Notebooks" && item.brand === "Apple").map((item) => (
                        <Card items={item} />
                    ))}
                </div>
                <div className="w-[100%] flex items-start justify-center">
                    <Link to='/shop?category=Notebooks&brand=Apple&query=all&price=all&rating=all&order=newest&page=1'>
                        <button className="secondary-btn">
                            View More
                        </button>
                    </Link>
                </div>
            </div>
            <Brand />
            <div className="px-3 py-6 mb-8 lg:px-[8%]">
                <Link to='/shop'>
                    <button className="secondary-btn ">
                        New Arrival
                    </button>
                </Link>
                <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-3">
                    {data.slice(data.length - 8).reverse().map((item) => (
                        <Card items={item} />
                    ))}
                </div>
            </div>
        </section>
    )
};

export default Item;