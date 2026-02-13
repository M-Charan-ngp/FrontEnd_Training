import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiService from '../services/apiServices'

export const useDepartmentStore = defineStore('department', () => {
    const departments = ref([])
    const isLoading = ref(false)

    const fetchDepartments = async () => {
        if (departments.value.length > 0) return 

        isLoading.value = true
        try {
            const params = { page: 1, limit: 100, sortBy: 'name', sortOrder: 'asc' }
            const response = await apiService.departments.getAll(params)
            
            departments.value = response.data.data.items 
        } catch (error) {
            console.error("Failed to load departments:", error)
        } finally {
            isLoading.value = false
        }
    }
const departmentOptions = computed(() => {
    return departments.value.map(dept => ({
        title: `${dept.department_name} (${dept.department_code})`,
        value: dept.id
    }))
})

    return {
        departments,
        isLoading,
        departmentOptions,
        fetchDepartments
    }
})