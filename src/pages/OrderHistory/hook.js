import axios from "axios";
import { useQuery } from "react-query";

import { GET_ORDER_HISTORY } from "constants/api";

const useOrderHistory = () => {
    const { isLoading, error, data } = useQuery("orderHistory", async () => {
        const { data } = await axios.get(`${GET_ORDER_HISTORY}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return data;
    });

    return {
        isLoading,
        error,
        data,
    };
};

export default useOrderHistory;
