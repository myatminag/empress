import axios from "axios";
import { useQuery } from "react-query";

import { BASE_URL } from "constants/api";

const useHistory = () => {
    const { isLoading, error, data } = useQuery("orderHistory", async () => {
        const { data } = await axios.get(`${BASE_URL}/server/orders/client`, {
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

export default useHistory;
