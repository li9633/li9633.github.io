import axios from "axios";

const request = axios.create({
    baseURL: "https://api.xindev.com",
    timeout: 10000,
});

export default request;