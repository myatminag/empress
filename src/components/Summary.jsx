import React from 'react';

const Summary = ({ name, data }) => {
    return (
        <div className="px-4 py-3 flex items-center justify-around rounded-md shadow-CustomShadow col-span-1 bg-blue"> 
            <p className="font-[400] text-white">
                { name }
            </p>
            <p className="font-[400] text-white">
                { data }
            </p>
        </div>
    )
}

export default Summary;