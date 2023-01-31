import React from 'react';

const Brand = () => {
    return (
        <div className="w-100 h-[50vh] lg:h-[80vh] relative mb-8">
            <img 
                src="/images/apple.jpeg" 
                alt="brand-ads"
                className="w-[100%] h-[50vh] lg:h-[80vh] object-cover absolute" 
            />
            <div className="py-12 flex flex-col items-center">
                <div className="absolute">
                    <p className="mb-8 text-center uppercase font-semibold text-xl lg:text-2xl">
                        For all exclusive collections
                    </p>
                    <p className="mb-16 text-center uppercase text-sm">
                        Discover the innovative world of apple
                    </p>
                    <p className="text-center uppercase text-2xl lg:text-4xl">
                        Don't miss the offer buy now!
                    </p>
                </div>
            </div>
        </div>
    )
};

export default Brand;