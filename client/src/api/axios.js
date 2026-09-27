import axios from "axios";

const API = axios.create({
    baseURL: "https://ai-jobprep-backend.onrender.com/api",
});

export default API;