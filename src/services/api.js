import axios from "axios";

// =========================================
// API BASE URL
// =========================================

// Local development:
// http://localhost:8080/api
//
// Production:
// https://hospital-backend-ltj2.onrender.com/api

const API_URL =
    process.env.REACT_APP_API_URL ||
    "http://localhost:8080";

const api = axios.create({

    baseURL: `${API_URL.replace(/\/+$/, "")}/api`,

    headers: {
        "Content-Type": "application/json"
    }
});


// =========================================
// REQUEST INTERCEPTOR
// =========================================

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {

        return Promise.reject(error);
    }
);


// =========================================
// RESPONSE INTERCEPTOR
// =========================================

api.interceptors.response.use(

    (response) => {

        return response;
    },

    (error) => {

        if (error.response?.status === 401) {

            /*
             * Do not automatically redirect here.
             * AuthContext / ProtectedRoute handles
             * authentication state.
             */

            console.warn(
                "Unauthorized API request."
            );
        }

        return Promise.reject(error);
    }
);


export default api;