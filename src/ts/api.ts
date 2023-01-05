import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {}
});

const formApi = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
        "Content-Type": "multipart/form-data",
        // 'Content-Type': 'application/json'
    }
});

export { api, formApi };