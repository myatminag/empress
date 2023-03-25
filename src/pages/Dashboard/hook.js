import axios from "axios";
import { useQuery } from "react-query";

import { baseUrl } from "utils/baseUrl";

const useDashboard = () => {

    const { isLoading, error, data } = useQuery("summary", async () => {
        const { data } = await axios.get(`${baseUrl}/server/orders/summary`, {
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

export default useDashboard;
