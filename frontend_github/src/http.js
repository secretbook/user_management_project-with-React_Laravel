import axios from 'axios';
export default axios.create({
    baseURL: 'http://localhost:8000/api',  // API endpoint URL
    headers: {
        'Content-Type': 'application/json',
    }
})