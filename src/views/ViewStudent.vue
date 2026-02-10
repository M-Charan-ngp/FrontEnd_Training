<script setup>
import {ref} from 'vue'
import { useStudentStore } from '../stores/student'
import FilterHeader from '@/components/FilterHeader.vue'
import Dialog from '@/components/Dialog.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStudentStore()
const handleUpdateRequest = (student) => {
    router.push({ 
        name: 'StudentForm', 
        params: { id: student.id } 
    })
}  
const goToNextPage = () => {
    store.page++;
}
const isDeleteDialogOpen = ref(false)
const selectedStudent = ref(null)

const handleRequestDelete = (student) => {
    selectedStudent.value = student
    isDeleteDialogOpen.value = true
}

const handleConfirmDelete = (student) => {
    store.removeStudent(student.id)
}

const updateFilters = (filter) => {
    store.search = filter.search
    store.Sort = filter.sortBy
}

const goToPrevPage = () => {
    store.page--;
}
const tableHeaders = ['id', 'Reg Number', 'Name', 'Gender', 'Date of Birth', 'Mobile No', 'E-mail', 'Course']
</script>

<template>

    <main>
        <FilterHeader @filterChange="updateFilters" />
        <TableComponent
            :headers="tableHeaders" 
            :data="store.paginatedList"
            :current-page="store.page"   
            :total-pages="store.totalPages" 
            @prev="goToPrevPage"
            @next="goToNextPage"
            @request-delete="handleRequestDelete"
            @request-update="handleUpdateRequest"
        >
            <template #pagination="" class="paginate">
                <button @click="goToPrevPage" :disabled="store.page <= 0" class="page-btn">Prev</button>
                <span class="page-text">Page {{ store.page + 1 }} of {{ store.totalPages }}</span>
                <button @click="goToNextPage" :disabled="store.page >= store.totalPages - 1" class="page-btn">Next</button>
            </template>
    </TableComponent>
    <Dialog 
        v-model:show="isDeleteDialogOpen"
        v-model:item="selectedStudent"
        title="Delete Student"
        confirm-text="Delete"
        confirm-color="red"
        @confirm="handleConfirmDelete"
    >
    
        <template #default="{ item }">
            Are you sure you want to delete <b>{{ item.name }}</b>? 
            This will remove them from the {{ item.course }} course list.
        </template>
    </Dialog>
    
    </main>
    
</template>

<style scoped>
.paginate{
    margin-top: 20px;
}
.page-btn {
    margin: 10px;
    padding: 8px 18px;
    background-color: #42b883; 
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-btn:hover:not(:disabled) {
    background-color: #3a9e71; 
    transform: translateY(-1px);
}

.page-btn:active:not(:disabled) {
    transform: translateY(0);
}

.page-btn:disabled {
    background-color: #dcdfe6;
    color: #909399;
    cursor: not-allowed;
    box-shadow: none;
}

.page-text {
    font-size: 0.95rem;
    color: #606266;
    font-family: sans-serif;
}

.page-text strong {
    color: #42b883;
}</style>

