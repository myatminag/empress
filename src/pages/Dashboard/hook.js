import axios from "axios";
import { useQuery } from "react-query";

import { GET_SUMMARY } from "constants/api";

const useDashboard = () => {

    const { isLoading, error, data } = useQuery("summary", async () => {
        const { data } = await axios.get(`${GET_SUMMARY}`, {
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
