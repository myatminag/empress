import Lottie from "lottie-react";

import animation from "assets/json/Empty.json";
import notfound from "assets/json/NotFound.json";
import loading from "assets/json/Loading.json";

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

export const LoadingLottie = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loading,
        style: {
            zIndex: "-100",
            position: "relative"
        }
    };

    return (
        <Lottie {...defaultOptions} />
    );
};