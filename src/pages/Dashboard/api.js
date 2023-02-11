import { useQuery } from 'react-query';

import { request } from 'utils/axios';

const API = () => {
    
    const { isLoading, error, data } = useQuery('summary', async () => { 
        const { data } = await request({ url: 'server/orders/summary'})
        return data;
    });

    return {
        isLoading, error, data
    };
};

export default API;