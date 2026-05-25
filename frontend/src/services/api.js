import axios from 'axios'


const api = axios.create({
    baseURL: "https://auth-api-oxvj.onrender.com"
})


export default api