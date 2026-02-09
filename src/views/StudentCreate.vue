<script setup>

import { useStudentStore } from '../stores/student'
import { ref,  } from 'vue'
const store = useStudentStore()
import FormComponent from '@/components/FormComponent.vue'
import { provide } from 'vue'

provide('message','hello!')

const studentData = ref({
    reg_no: '',
    name: '',
    gender: '',
    dob: '',
    phone: '',
    email: '',
    course: ''
})

const onFormSubmit = () => {
    store.addStudent(studentData.value)
    alert("Student added successfully!")
    student.value = { reg_no: '', name: '', gender: '', dob: '', phone: '', email: '', course: '' }
}
</script>

<template>
    
    <div class="container">
        <FormComponent v-model="studentData" @submit="onFormSubmit" />
        <button class="view-table" @click="this.$router.push('/studentdata');">View Student Table</button>
    </div>
</template>

<style scoped>

.container {
  display:flex;
  justify-content: center;
  flex-direction: column;
  min-width: 100%;
  padding: 20px 20px;
  background-color: rgb(255, 255, 255);
}

button {
  width: 100%;
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;
  margin: 10px;
}
button:hover {
  background-color: #33a06f;
}
</style>