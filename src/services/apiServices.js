import api from './api'; 

const apiService = {
    auth: {
        login: (credentials) => api.post('api/login', credentials),
        signup: (userData) => api.post('api/register', userData),
    },

    students: {
        getAll: (params) => api.get('api/students', { params }),
        getOne: (id) => api.get(`api/students/${id}`),
        create: (data) => api.post('api/students', data),
        update: (id, data) => api.put(`api/students/${id}`, data),
        delete: (id) => api.delete(`api/students/${id}`)
    },
    departments: {
    getAll: () => api.get('api/departments', { 
        params: { page: 1, limit: 100, sortBy: 'name', sortOrder: 'asc' } 
    })
}
};

export default apiService;