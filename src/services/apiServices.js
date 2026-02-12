import api from './api'; 

const apiService = {
    auth: {
        login: (credentials) => api.post('api/login', credentials),
        signup: (userData) => api.post('api/register', JSON.parse(JSON.stringify(userData))),
        logout: () => {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_role');
        }
    },

    tudents: {
        getAll: (params) => api.get('api/students', { params }),
        getOne: (id) => api.get(`api/students/${id}`),
        create: (data) => api.post('api/students', data),
        update: (id, data) => api.put(`api/students/${id}`, data),
        delete: (id) => api.delete(`api/students/${id}`)
    },

    products: {
        getAll: () => api.get('/products'),
        checkout: (cartData) => api.post('/orders', cartData)
    }
};

export default apiService;