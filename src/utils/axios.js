import axios from "axios";

const client = axios.create({ baseURL: 'https://empress-api.onrender.com' })

export const request = ({ ...options }) => {

    const accessToken = localStorage.getItem("accessToken");

    client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    const onSuccess = response => response;
    const onError = error => {
        return error
    } 

    return client(options).then(onSuccess).catch(onError)
};