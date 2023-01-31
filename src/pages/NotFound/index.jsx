import React from 'react';

import { NotFoundLottie } from 'utils/animation';

const NotFound = () => {
    return (
        <div className="px-3 py-6">
            <div className="w-[350px] mx-auto">
                <NotFoundLottie />
            </div>
            <p className="mb-3 text-lg text-center">
                Oops. The Page Not Found!
            </p>
            <p className="mb-3 text-center text-sm">
                We're sorry!. The server has encountered an internal error and was unable to complete
                your request.
            </p>
            <p className="mb-3 text-center text-sm">
                Currently, we're fixing this issue.
            </p>
        </div>
    )
};

export default NotFound;