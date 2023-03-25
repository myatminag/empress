const getAccessToken = (key) => {
    return localStorage.getItem(key);
};

export const GET_ACCESS_TOKEN = getAccessToken("accessToken");