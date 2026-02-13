import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiService from '../services/apiServices'

export const useStudentStore = defineStore('student', () => {
    const students = ref([])
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
            const response = await apiService.students.getOne(id)
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
            await fetchStudents() // Refresh list
        } catch (error) {
            console.error("Failed to delete student:", error)
        }
    }

    const totalPages = computed(() => {
        return Math.ceil(totalItems.value / limit.value) || 1
    })

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
        removeStudent
    }
})