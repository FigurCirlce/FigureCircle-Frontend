import axios from "axios";
// Setting up base Url for fetching data
const Axios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${typeof window !== 'undefined' && localStorage.getItem('token')}`,
    },
});
export default Axios;