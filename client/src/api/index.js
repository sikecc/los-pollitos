import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const insertTasks = payload => api.post(`list`,payload);
export const getAllTasks = () => api.get(`lists`);
export const updateTaskById = (id, payload) => api.put(`list/${id}`,payload);
export const deleteTaskById = id => api.delete(`list/${id}`);
export const getTaskById = id => api.get(`list/${id}`);
export const getListById = id => api.get(`lists/${id}`);

const apis = {
    insertTasks,
    getAllTasks,
    updateTaskById,
    deleteTaskById,
    getTaskById,
    getListById,
}

export default apis;
