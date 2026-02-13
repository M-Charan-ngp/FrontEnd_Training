<script setup>
import {onMounted, ref, computed} from 'vue'
import { useStudentStore } from '../stores/student'
import { useAuthStore } from '../stores/AuthStore'
import FilterHeader from '@/components/FilterHeader.vue'
import Dialog from '@/components/Dialog.vue'
import { useRouter } from 'vue-router'
import ViewCourseDialog from '../components/ViewCourseDialog.vue'
import Header from '../components/Header.vue'

const courseDialog = ref(false)
const activeStudentId = ref(null)

const handleViewCourses = (student) => {
  activeStudentId.value = student.id
  courseDialog.value = true
}

const router = useRouter()
const store = useStudentStore()
const authStore = useAuthStore()
const themeColor = computed(() => authStore.themeColor)
const handleUpdateRequest = (student) => {
    router.push({ 
        name: 'StudentForm', 
        params: { id: student.id } 
    })
}
const goToNextPage = async () => {
    store.page++;
    await store.fetchStudents(); 
}

const goToPrevPage = async () => {
    store.page--;
    await store.fetchStudents();
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
    store.sortBy = filter.sortBy 
    store.page = 1 
    store.fetchStudents()
}

onMounted(async () => {
        try {
            store.fetchStudents()
        } catch (error) {
            console.error("Could not load students:", error)
            alert("Students not found")
            router.push('/studentdata')
        }
})
const tableHeaders = ['id', 'Reg Number', 'Name', 'Gender', 'Date of Birth', 'Mobile No', 'E-mail', 'Course']
</script>

<template>

    <main>
          <Header class="mb-16"></Header>
        <FilterHeader class="mt-16 pt-13" @filterChange="updateFilters" />
        <TableComponent
            :headers="tableHeaders" 
            :data="store.paginatedList"
            :current-page="store.page"   
            :total-pages="store.totalPages" 
            @prev="goToPrevPage"
            @next="goToNextPage"
            @request-delete="handleRequestDelete"
            @request-update="handleUpdateRequest"
            @view-courses="handleViewCourses"
        >
            <template #pagination="" class="paginate">
                <button @click="goToPrevPage" :disabled="store.page <= 1" class="page-btn">Prev</button>
                <span class="page-text">Page {{ store.page }} of {{ store.totalPages }}</span>
                <button @click="goToNextPage" :disabled="store.page >= store.totalPages" class="page-btn">Next</button>
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
            This will remove them from the <strong>{{ item.departmentInfo?.name }}</strong> department records.
        </template>
    </Dialog>
    <ViewCourseDialog 
      v-model="courseDialog"
      :student-id="activeStudentId"
      :theme-color="themeColor"
    />
    
    </main>
    
</template>

<style scoped>
.paginate{
    margin-top: 20px;
}
.page-btn {
    margin: 10px;
    padding: 8px 18px;
    background-color: v-bind(themeColor);
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

