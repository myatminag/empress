import React from 'react';
import Divider from '@mui/material/Divider';

const Subtitle = ({ name }) => {
    return (
        <div className="mb-6">
            <header className="font-semibold uppercase text-lg text-center tracking-widest mb-4">
                { name }
            </header>
            <Divider light />
        </div>
    )
};

export default Subtitle;