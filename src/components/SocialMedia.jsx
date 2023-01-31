import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const SocialMedia = () => {
    return (
        <div className="flex items-center gap-x-5">
            <FaFacebook size={23} />
            <FaTwitter size={23} />
            <FaInstagram size={23} />
            <FaYoutube size={23} />
        </div>
    )
};

export default SocialMedia;