import axios from 'axios'

const BASE_URL = 'https://633ee1b383f50e9ba3bb07fe.mockapi.io/';

export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    // withCredentials: true
});