import { LoadingLottie } from "utils/animation";

const Waiting = () => {
    return (
        <div className="w-100 flex items-center justify-center">
            <div className="w-[350px]">
                <LoadingLottie />
            </div>
        </div>
    )
};

export default Waiting;