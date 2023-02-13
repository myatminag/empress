import axios from "axios";
import { useQuery } from "react-query";

import { baseUrl } from "utils/baseUrl";

const API = () => {
  const { isLoading, error, data } = useQuery("home", async () => {
    const { data } = await axios.get(`${baseUrl}/server/Items`);
    return data;
  });

  return {
    isLoading,
    error,
    data,
  };
};

export default API;
