import { useQuery } from 'react-query';

import { request } from 'utils/axios';

const API = () => { 

    const { isLoading, error, data } = useQuery('home', async () => {
        const { data } = await request({ url: '/server/items' })
        return data;
    });

    return {
        isLoading, error, data 
    };
};

export default API;