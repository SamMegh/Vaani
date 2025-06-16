import axios from 'axios';
const Instance=axios.create({
    baseURL:'http://localhost:8080/chat/',
    withCredentials: true,
})

export default Instance;