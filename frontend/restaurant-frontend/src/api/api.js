import axios from 'axios';

const BASE_URL = 'http://localhost:9090/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Tables
export const getTables = () => api.get('/tables');
export const addTable = (table) => api.post('/tables', table);
export const updateTableStatus = (id, status) => api.put(`/tables/${id}/status/${status}`);
export const deleteTable = (id) => api.delete(`/tables/${id}`);

// Customers
export const getCustomers = () => api.get('/customers');
export const addCustomer = (customer) => api.post('/customers', customer);
export const deleteCustomer = (id) => api.delete(`/customers/${id}`);

// Waitlist
export const getWaitlist = () => api.get('/waitlist');
export const joinWaitlist = (customerId) => api.post(`/waitlist/join/${customerId}`);
export const cancelWaitlist = (id) => api.put(`/waitlist/${id}/cancel`);
export const markSeated = (id) => api.put(`/waitlist/${id}/seated`);

// Bookings
export const getBookings = () => api.get('/bookings');
export const createBooking = (customerId, tableId) => api.post(`/bookings/customer/${customerId}/table/${tableId}`);
export const completeBooking = (id) => api.put(`/bookings/${id}/complete`);
export const cancelBooking = (id) => api.put(`/bookings/${id}/cancel`);

// Orders
export const getOrders = () => api.get('/orders');
export const placeOrder = (bookingId, order) => api.post(`/orders/booking/${bookingId}`, order);
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}/status/${status}`);
export const getOrdersByBooking = (bookingId) => api.get(`/orders/booking/${bookingId}`);
export const getTotalBill = (bookingId) => api.get(`/orders/booking/${bookingId}/bill`);

// Dashboard
export const getAllWaitlist = () => api.get('/waitlist/all');
export const getAllOrders = () => api.get('/orders');