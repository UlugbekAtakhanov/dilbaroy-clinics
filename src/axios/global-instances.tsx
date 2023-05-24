import axios from "axios"
import { getFromLS } from "../utils/localStorage";


axios.defaults.headers.post["Content-Type"] = 'multipart/form-data'
// axios.defaults.headers.post["Content-Type"] = 'application/json'

export const fetchData = axios.create({
    baseURL: "https://dilbaroy.pythonanywhere.com/",
    // baseURL: "https://klinika.pythonanywhere.com",
})


fetchData.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${getFromLS("token")}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    });





