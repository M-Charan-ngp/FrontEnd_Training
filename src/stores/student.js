import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiService from '../services/apiServices'

export const useStudentStore = defineStore('student', () => {
    const students = ref([])
    const courses = ref([])
    const totalItems = ref(0)
    const page = ref(1) 
    const limit = ref(5)
    const search = ref('')
    const sortBy = ref('regNo')
    const sortOrder = ref('asc')
    const isLoading = ref(false)

    const fetchStudents = async () => {
        isLoading.value = true
        try {
            const params = {
                page: page.value,
                limit: limit.value,
                search: search.value,
                sortBy: sortBy.value,
                sortOrder: sortOrder.value,
                department: true 
            }
            
            const response = await apiService.students.getAll(params)
            students.value = response.data.data.items
            totalItems.value = response.data.data.meta.total
        } catch (error) {
            console.error("Failed to fetch students:", error)
        } finally {
            isLoading.value = false
        }
    }
    
    const fetchStudentById = async (id) => {
        isLoading.value = true
        try {
            const params = { courses: true, department: true }
            const response = await apiService.students.getOne(id, params)
            
            let studentData = response.data.data
            
            if (studentData.dob && studentData.dob.includes('T')) {
                studentData.dob = studentData.dob.split('T')[0]
            }
            
            return { success: true, data: studentData }
        } catch (error) {
            return { success: false, error: error.response?.data?.message }
        } finally {
            isLoading.value = false
        }
    }

    const addStudent = async (studentData) => {
        try {
            await apiService.students.create(studentData)
            await fetchStudents() 
            return { success: true }
        } catch (error) {
            return { success: false, error: error.response?.data?.message }
        }
    }

    const updateStudent = async (id, updatedData) => {
        try {
            await apiService.students.update(id, updatedData)
            await fetchStudents() 
            return { success: true }
        } catch (error) {
            return { success: false, error: error.response?.data?.message }
        }
    }

    const removeStudent = async (id) => {
        try {
            await apiService.students.delete(id)
            await fetchStudents()
        } catch (error) {
            console.error("Failed to delete student:", error)
        }
    }

    const totalPages = computed(() => {
        return Math.ceil(totalItems.value / limit.value) || 1
    })

    const enrollInCourse = async (studentId, courseId) => {
        isLoading.value = true
        try {
            const payload = { 
                studentId: Number(studentId), 
                courseId: Number(courseId) 
            }
            const response = await apiService.enrollment.assignCourseToStudent(payload)
            return { success: true, message: response.data.message }
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.message || "Enrollment failed" 
            }
        } finally {
            isLoading.value = false
        }
    }

const bulkEnrollInCourse = async (courseId, studentIds) => {
    isLoading.value = true 
    try {
        console.log("Enrolling in Course ID:", courseId)
        const formattedIds = studentIds.map(id => Number(id))
        
        const response = await apiService.enrollment.assignBulkStudentsToCourse(
            courseId, 
            formattedIds
        )
        
        return { success: true, message: response.data.message }
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data?.message || "Bulk enrollment failed" 
        }
    } finally {
        isLoading.value = false
    }
}

    const fetchCourses = async () => {
    try {
        const params = {
            page: 1,
            limit: 100, 
            department: true
        }
        const response = await apiService.courses.getAll(params)
        courses.value = response.data.data.items
    } catch (error) {
        console.error("Failed to fetch courses:", error)
    }
}

    const paginatedList = computed(() => students.value)

    return {
        students,
        page,
        limit,
        search,
        sortBy,
        sortOrder,
        isLoading,
        totalPages,
        paginatedList,
        fetchStudentById,
        fetchStudents,
        addStudent,
        updateStudent,
        removeStudent,
        courses,
        fetchCourses,
        enrollInCourse,
        bulkEnrollInCourse,
    }
})