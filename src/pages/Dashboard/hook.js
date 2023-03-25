import axios from "axios";
import { useQuery } from "react-query";

import { baseUrl } from "utils/baseUrl";
import { GET_ACCESS_TOKEN } from "utils/accessToken";

const useDashboard = () => {

    const { isLoading, error, data } = useQuery("summary", async () => {
        const { data } = await axios.get(`${baseUrl}/server/orders/summary`, {
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

export default useDashboard;
