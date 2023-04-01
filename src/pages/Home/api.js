import axios from "axios";
import { useQuery } from "react-query";

import { GET_ITEM } from "constants/api";

const API = () => {
  const { isLoading, error, data } = useQuery("home", async () => {
    const { data } = await axios.get(`${GET_ITEM}`);
    return data;
  });

  return {
    isLoading,
    error,
    data,
  };
};

export default API;
