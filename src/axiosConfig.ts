import axios from "axios";

export const axiosAuthInstance = axios.create({
    baseURL: "http://localhost:3001/auth"
})

export const axiosCategoriesInstance = axios.create({
    baseURL: "http://localhost:3001/categories"
})

export const axiosProductsInstance = axios.create({
    baseURL: "http://localhost:3001/products"
})