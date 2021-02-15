import axios from 'axios';

export const axiosBase = axios.create({
    baseURL : "/api/v1"
})

