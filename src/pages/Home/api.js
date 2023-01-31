import axios from 'axios';
import { useQuery } from 'react-query';

const API = () => { 

    const { isLoading, error, data } = useQuery('summary', async () => {
        const { data } = await axios.get(
            'https://empress-api.onrender.com/server/items'
        );
        return data;
    });

    return {
        isLoading, error, data
    };
};

export default API;