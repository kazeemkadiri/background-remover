import axios from "axios";

export default function useAxios() {
    const baseURL = import.meta.env.VITE_ENVIRONMENT === "production"
        ? import.meta.env.VITE_API_BASE_URL
        : "http://localhost:5000/api";

    const customAxios = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    return customAxios;
}