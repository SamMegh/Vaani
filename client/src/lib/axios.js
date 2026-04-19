import axios from 'axios';
const Instance=axios.create({
    baseURL:'https://vaani-hsph.onrender.com/',
    withCredentials: true,
})

export default Instance;