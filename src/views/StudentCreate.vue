<script setup>
import { reactive, computed, ref, watch } from 'vue'

const fname = ref("")
const lname = ref("")
const studentList = ref([])
const errors = ref({})
const formSubmitted = ref(false)

const student = reactive({
    reg_no: '',
    name: '',
    gender: '',
    dob: '',
    phone: '',
    email: '',
    city: ''
})

const fullName = computed(() => {
    return (fname.value + ' ' + lname.value).trim()
})

const name = watch(fullName, (newVal) => {
    student.name = newVal
})

const totalFields = 7;
const formProgress = computed(() => {
    const completedFields = Object.values(student).filter(value => value !== '').length;
    console.log(name)
    return Math.round((completedFields / totalFields) * 100);
});

const progressColor = computed(() => {
    if (formProgress.value < 50) return '#ff4d4d'; 
    if (formProgress.value < 100) return '#f1c40f';
    return '#42b883';
});

const validateField = (field, value) => {
    if (!value && field !== 'name') return `${field.replace('_', ' ')} is required`
    
    switch (field) {
        case 'reg_no':
            if (!/^[0-9]{2}[A-Z]{3}[0-9]{4}$/.test(value)) return 'Format: 24MCA0010'
            break
        case 'name':
            if (!value || value.length < 1) return 'Full name is required'
            if (value.length < 3) return 'Minimum 3 characters required'
            break
        case 'phone':
            if (!/^[0-9]{10}$/.test(value)) return 'Must be exactly 10 digits'
            break
        case 'email':
            if (!/^\S+@\S+\.\S+$/.test(value)) return 'Invalid email format'
            break
    }
    return null
}

Object.keys(student).forEach((field) => {
    watch(() => student[field], (newVal) => {
        const error = validateField(field, newVal)
        if (error && (newVal !== '' || formSubmitted.value)) {
            errors.value[field] = error
        } else {
            delete errors.value[field]
        }
    })
})

const validateAll = () => {
    const newErrors = {}
    Object.keys(student).forEach(field => {
        const error = validateField(field, student[field])
        if (error) newErrors[field] = error
    })
    errors.value = newErrors
    return Object.keys(newErrors).length === 0
}

const showToast = (msg) => alert(msg)

const handleSubmit = () => {
    formSubmitted.value = true
    if (validateAll()) {
        studentList.value.push({ ...student })
        showToast(`Student ${student.name} added successfully!`)
        
        Object.keys(student).forEach(key => student[key] = '')
        fname.value = ""
        lname.value = ""
        errors.value = {}
        formSubmitted.value = false
    }
}
</script>

<template>
    <div class="container">
        <div class="student_form">
            <h1>Add Student</h1>
            
            <div class="progress-section">
                <p>Form Completion: {{ formProgress }}%</p>
                <div class="progress-container">
                    <div class="progress-bar" 
                         :style="{ width: formProgress + '%', backgroundColor: progressColor }">
                    </div>
                </div>
            </div>

            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label>Student Register Number: </label>
                    <input type="text" 
                        v-model="student.reg_no" 
                        placeholder="eg:24ABC0000" 
                        :class="{ 'invalid': errors.reg_no }">
                    <p class="error" v-if="errors.reg_no">{{ errors.reg_no }}</p>
                </div>

                <div class="form-group">
                    <label>First Name: </label>
                    <input type="text" v-model="fname" placeholder="First Name">
                </div>
                
                <div class="form-group">
                    <label>Last Name: </label>
                    <input type="text" v-model="lname" placeholder="Last Name">
                </div>

                <div class="name-preview">
                    <strong>Full Name Preview:</strong> {{ student.name || '---' }}
                    <p class="error" v-if="errors.name">{{ errors.name }}</p>
                </div>
                
                <div class="form-group">
                    <label>Student Gender: </label>
                    <div class="radio_group">
                        <label><input type="radio" value="Male" v-model="student.gender"> Male</label>
                        <label><input type="radio" value="Female" v-model="student.gender"> Female</label>
                    </div>
                    <p class="error" v-if="errors.gender">{{ errors.gender }}</p>
                </div>

                <div class="form-group">
                    <label>Date of Birth:</label>
                    <input type="date" v-model="student.dob" :class="{ 'invalid': errors.dob }">
                    <p class="error" v-if="errors.dob">{{ errors.dob }}</p>
                </div>

                <div class="form-group">
                    <label>Student E-mail: </label>
                    <input type="email" v-model="student.email" placeholder="eg:abc@xyz.com" :class="{ 'invalid': errors.email }">
                    <p class="error" v-if="errors.email">{{ errors.email }}</p>
                </div>

                <div class="form-group">
                    <label>Student Phone Number: </label>
                    <input type="text" v-model="student.phone" placeholder="eg:9876543210" :class="{ 'invalid': errors.phone }">
                    <p class="error" v-if="errors.phone">{{ errors.phone }}</p>
                </div>

                <div class="form-group">
                    <label>Student City: </label>
                    <input type="text" v-model="student.city" placeholder="city" :class="{ 'invalid': errors.city }">
                    <p class="error" v-if="errors.city">{{ errors.city }}</p>
                </div>

                <button type="submit">Submit Student</button>
            </form>
        </div>

        <div class="table-view" v-if="studentList.length > 0">
            <table>
                <thead>
                    <tr>
                        <th v-for="(val, key) in studentList[0]" :key="key">{{ key.toUpperCase() }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(s, index) in studentList" :key="index">
                        <td>{{ s.reg_no }}</td>
                        <td>{{ s.name }}</td>
                        <td>{{ s.gender }}</td>
                        <td>{{ s.dob }}</td>
                        <td>{{ s.phone }}</td>
                        <td>{{ s.email }}</td>
                        <td>{{ s.city }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="empty-view">
            <h1>No Student Data Found...</h1>
        </div>
    </div>
</template>

<style scoped>

.form-group {
  margin-bottom: 10px;
  text-align: left;
}
.container {
  display:flex;
  justify-content: center;
  min-width: 100%;
  padding: 20px 20px;
  background-color: white;
}
.student_form {
  background: white;
  flex: 1;
  padding: 30px;
  border-radius: 12px;
  border-color: #000000;
  width: 100%;
  min-width: 400px;
  max-width: 1200px;
}
h1 {
  color: #2c3e50;
  margin-bottom: 5px;
  text-align: center;
  font-size: 1.8rem;
}
label {
  display: flex;
  font-weight: bold;
}
.invalid {
  border: 2px solid #ff4d4d !important;
  background-color: #fff5f5;
}
.error {
  color: #ff4d4d;
  font-size: 0.75rem;
  margin-top: 4px;
  font-weight: bold;
}
input[type="text"],
input[type="email"],
input[type="date"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}
.radio_group {
  display: flex;
  gap: 20px;
  padding-top: 5px;
  margin-bottom: 10px;
}
button {
  width: 100%;
  padding: 14px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 10px;
}
.radio_group label {
  font-weight: normal;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #33a06f;
}
table {
  border-collapse:collapse;
  margin: auto;
  width: 100%;
  max-width: 1200px;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  min-width: 700px;
  border-radius: 8px;
  overflow: hidden;
}

th {
  background-color: #42b883;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  padding: 15px;
}
.table-view{
    flex:2;
    margin-left: 20px;
    min-width: 600px;
}
.empty-view{
    flex:2;
    margin-left: 20px;
    min-width: 600px;
}

td {
  padding: 10px ;
  border-bottom: 1px solid #eee;
  align-items: center;
  word-break: break-all;
  max-width: 700px;
  color: #333;
}
button {
  background-color: #42b883; 
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
  cursor: pointer;
}
.progress-container {
    width: 100%;
    height: 12px;          
    background-color: #eee;
    border-radius: 6px;
    margin-top: 10px;
    overflow: hidden;
}
.progress-bar {
    height: 100%;
}
</style>