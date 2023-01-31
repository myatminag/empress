import Lottie from "lottie-react";

import animation from "assets/Empty.json";
import notfound from "assets/NotFound.json";

export const AnimationLottie = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        style: {
            zIndex: "-100",
            position: "relative"
        }
    };

    return (
        <Lottie {...defaultOptions} />
    );
};

export const NotFoundLottie = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: notfound,
        style: {
            zIndex: "-100",
            position: "relative"
        }
    };

    return (
        <Lottie {...defaultOptions} />
    );
};