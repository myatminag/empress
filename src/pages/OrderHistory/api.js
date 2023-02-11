import { useQuery } from 'react-query';

import { request } from 'utils/axios';

const API = () => { 

    const { isLoading, error, data } = useQuery('orderHistory', async () => {
        const { data } = await request({ url: '/server/orders/client' })
        return data;
    });

    return {
        isLoading, error, data
    };
};

export default API;