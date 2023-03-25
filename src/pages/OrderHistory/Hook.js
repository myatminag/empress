import axios from "axios";
import { useQuery } from "react-query";

import { baseUrl } from "utils/baseUrl";
import { GET_ACCESS_TOKEN } from "utils/accessToken";

const useOrderHistory = () => {
    const { isLoading, error, data } = useQuery("orderHistory", async () => {
        const { data } = await axios.get(`${baseUrl}/server/orders/client`, {
            headers: { authorization: `Bearer ${GET_ACCESS_TOKEN}` },
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
