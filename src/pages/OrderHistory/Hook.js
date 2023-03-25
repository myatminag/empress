import axios from "axios";
import { useQuery } from "react-query";

import { baseUrl } from "utils/baseUrl";
import { GET_ACCESS_TOKEN } from "utils/accessToken";

const useOrderHistory = () => {
    const { isLoading, error, data } = useQuery("orderHistory", async () => {
        const { data } = await axios.get(`${baseUrl}/server/orders/client`, {
            headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` },
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
