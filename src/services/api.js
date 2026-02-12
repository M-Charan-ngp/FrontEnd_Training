import axios from 'axios';
import { useAuthStore } from '@/stores/AuthStore';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    const apiKey = import.meta.env.VITE_BACKEND_API_KEY;
    const token = authStore.token;
    if (apiKey) {
        config.headers['api-key'] = apiKey; 
    }
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        const authStore = useAuthStore(); 
        if (response) {
            switch (response.status) {
                case 401:
                    const backendMessage = response.data?.error || "Unauthorized access";
                    console.warn(`Auth Error: ${backendMessage}`);

                    if (backendMessage.includes("API Key")) {
                        console.error("Critical: API Key issue detected.");
                    }
                    authStore.logout(); 
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login';
                    }
                    break;

                case 403:
                    alert("Access Denied: You do not have permission for this.");
                    break;

                case 404:
                    console.error("Resource not found (404).");
                    break;

                case 422:
                    console.error("Validation failed:", response.data.errors);
                    break;

                case 500:
                    alert("Internal Server Error (500).");
                    break;
            }
        } else {
            alert("Network error.");
        }
        return Promise.reject(error);
    }
);

export default api;