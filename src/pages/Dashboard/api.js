import { useContext } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

import { Context } from 'context/user-context';

const API = () => { 
    const { state } = useContext(Context);
    const { userInfo } = state;

    const { isLoading, error, data } = useQuery('summary', async () => {
        const { data } = await axios.get(
            'https://empress-api.onrender.com/server/orders/summary', { 
                headers: { authorization: `Bearer ${userInfo.user.token}` }
            }
        );
        return data;
    });

    return {
        isLoading, error, data
    };
};

export default API;