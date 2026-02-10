<script setup>

import { useStudentStore } from '../stores/student'
import { ref, provide, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const store = useStudentStore()
import FormComponent from '@/components/FormComponent.vue'


const themeColor = ref('#42b883')
const isEditMode = ref(false)
const dynamicTitle = computed(() => isEditMode.value ? 'Edit Student' : 'Add Student')
provide('theme', themeColor)
provide('title',dynamicTitle)

const route = useRoute()
const router = useRouter()

const studentData = ref({
    reg_no: '',
    name: '',
    gender: '',
    dob: '',
    phone: '',
    email: '',
    course: ''
})

onMounted(() => {
    const id = route.params.id
    if (id) {
        const existing = store.studentList.find(s => s.id === parseInt(id))
        if (existing) {
            studentData.value = JSON.parse(JSON.stringify(existing))
            isEditMode.value = true
        }
    }
})

const toggleTheme = () => {
    themeColor.value = themeColor.value === '#42b883' ? '#35495e' : '#42b883'
}
const onFormSubmit = () => {
    if (isEditMode.value) {

      store.updateStudent(studentData.value)
      alert("Student updated!")
    } else {
      store.addStudent(studentData.value)
        alert("Student added!")
    }
    router.push('/studentdata')
}
</script>

<template>
    
    <div class="container">
      <button @click="toggleTheme" class="theme-btn">Switch Theme</button>
        <FormComponent v-model="studentData" @submit="onFormSubmit" />
        <button class="view-table" @click="this.$router.push('/studentdata');">View Student Table</button>
    
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