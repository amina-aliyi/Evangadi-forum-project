import axios from 'axios';
const axiosBase = axios.create({
    baseURL: 'http://localhost:6001/api'
})


export default axiosBase;