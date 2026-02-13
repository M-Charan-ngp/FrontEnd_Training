import api from './api'; 

const apiService = {
    auth: {
        login: (credentials) => api.post('api/login', credentials),
        signup: (userData) => api.post('api/register', userData),
    },

    students: {
        getAll: (params) => api.get('api/students', { params }),
        getOne(id, params) {
            return api.get(`/api/students/${id}`, { params })
        },
        create: (data) => api.post('api/students', data),
        update: (id, data) => api.put(`api/students/${id}`, data),
        delete: (id) => api.delete(`api/students/${id}`)
    },
    departments: {
        getAll: () => api.get('api/departments', { 
            params: { page: 1, limit: 100, sortBy: 'name', sortOrder: 'asc' } 
        })
    },
    courses: {
        getAll(params) {
            return api.get('/api/courses', { params })
        }
    },
    enrollment: {
        assignCourseToStudent(payload) {
            return api.post('/api/enroll', payload)
        },
        assignBulkStudentsToCourse(courseId, studentIds) {
            return api.post(`/api/courses/${courseId}/enroll-students`, { studentIds })
        }
    }
};

export default apiService;