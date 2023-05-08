import axios from "axios";
import { server } from "../Service/server_con";

const apiManager = axios.create({
    baseURL: server+"api",
    responseType: "json",
    withCredentials: true,
});

export default apiManager;