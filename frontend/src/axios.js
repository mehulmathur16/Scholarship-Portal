import axios from 'axios';

const instance = axios.create({
    baseURL: "https://scholarship-portal.onrender.com/",
})

export default instance;