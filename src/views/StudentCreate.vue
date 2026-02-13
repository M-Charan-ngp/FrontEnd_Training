<script setup>

import { useStudentStore } from '../stores/student'
import { ref, provide, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FormComponent from '@/components/FormComponent.vue'
import { useAuthStore } from '../stores/AuthStore'
const store = useStudentStore()


const authStore = useAuthStore()
const themeColor = computed(() => authStore.themeColor)
const isEditMode = ref(false)
const dynamicTitle = computed(() => isEditMode.value ? 'Edit Student' : 'Add Student')
provide('themeColor',themeColor)
provide('title',dynamicTitle)

const route = useRoute()
const router = useRouter()

const studentData = ref({
    regNo: '',   
    name: '',
    gender: '',
    dob: '',
    phone: '',
    email: '',
    departmentId: null 
})

onMounted(async () => {
    const id = route.params.id
    if (id) {
        isEditMode.value = true
        const result = await store.fetchStudentById(id)
        if (result.success) {
            studentData.value = result.data
        } else {
            alert(result.error || "Student not found")
            router.push('/studentdata')
        }
    }
})


const onFormSubmit = async () => {
    let result;
    
    if (isEditMode.value) {
        result = await store.updateStudent(route.params.id, studentData.value)
    } else {
        result = await store.addStudent(studentData.value)
    }

    if (result.success) {
        alert(isEditMode.value ? "Student updated!" : "Student added!")
        router.push('/studentdata')
    } else {
        alert("Error: " + (result.error || "Something went wrong"))
    }
}
</script>

<template>
    
    <div class="d-flex justify-center flex-row pa-16">
        <FormComponent v-model="studentData" @submit="onFormSubmit" />
       
    
    </div>
</template>

<style scoped>

.container {
  display:flex;
  justify-content: center;
  width: 100vw;        
  align-items: center;
  min-height: 100vh;  
  flex-direction: column;
  min-width: 100%;
  padding: 20px 20px;
  background-color: rgb(255, 255, 255);
}

button {
  width: 100%;
  padding: 10px 20px;
  background-color: v-bind(themeColor);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;
}
.theme-btn {
  padding: 8px 16px;
  border: 2px solid v-bind(themeColor); 
  background: transparent;
  color: v-bind(themeColor);
  margin-bottom: 5px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  width: fit-content;
  display: flex;
  align-items: center;
}

.theme-btn:hover {
  background-color: v-bind(themeColor);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

</style>