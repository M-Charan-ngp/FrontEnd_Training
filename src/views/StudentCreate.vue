<script setup>

import { useStudentStore } from '../stores/student'
import { ref, provide } from 'vue'
const store = useStudentStore()
import FormComponent from '@/components/FormComponent.vue'
const themeColor = ref('#42b883')
provide('title','Form Application')
provide('theme', themeColor)

const studentData = ref({
    reg_no: '',
    name: '',
    gender: '',
    dob: '',
    phone: '',
    email: '',
    course: ''
})
const toggleTheme = () => {
    themeColor.value = themeColor.value === '#42b883' ? '#35495e' : '#42b883'
}
const onFormSubmit = () => {
    store.addStudent(studentData.value)
    alert("Student added successfully!")
    student.value = { reg_no: '', name: '', gender: '', dob: '', phone: '', email: '', course: '' }
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