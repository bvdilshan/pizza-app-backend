/**
 * @file api.js
 * @description Axios instance and API service methods
 */
import axios from 'axios';

const API = axios.create({

    baseURL: "/api",
});

API.interceptors.request.use((req) => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
        try {
            const user = JSON.parse(storedUser);
            if (user.token) {
                req.headers.Authorization = `Bearer ${user.token}`;
            }
        } catch (error) {
            console.error("Error parsing user from localStorage", error);
        }
    }
    return req;
});

export const fetchMenu = () => API.get('/menu');
export const fetchPizzaById = (id) => API.get(`/menu/${id}`);
export const placeOrder = (orderData) => API.post('/orders/checkout', orderData);
export const getMyOrders = (userId) => API.get(`/orders/my-orders/${userId}`);
export const loginUser = (authData) => API.post('/auth/login', authData);
export const signupUser = (authData) => API.post('/auth/signup', authData);
export const updateOrderStatus = (id, statusData) => API.patch(`/orders/update-status/${id}`, statusData);

export default API;