export const accessToken = localStorage.getItem("accessToken");


// export const getAccessToken = () => {
//     JSON.parse(localStorage.getItem("accessToken"))
// };

const getAccessToken = (key) => {
    return localStorage.getItem(key);
};

export const GET_ACCESS_TOKEN = getAccessToken("accessToken");