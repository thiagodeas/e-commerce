import axios from "axios";

export const axiosAuthInstance = axios.create({
    baseURL: "http://localhost:3001/auth"
})
