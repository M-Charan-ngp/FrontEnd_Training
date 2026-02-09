<script setup>
import { computed, inject, ref, watch } from 'vue'
import { vFocus, vCapitalize } from '@/composables/custom_directives.js'
import Header from '@/components/Header.vue'
const emit = defineEmits(['submit'])


const student = defineModel({ required: true })

const fname = ref("")
const lname = ref("")
const errors = ref({})
const formSubmitted = ref(false)


const fullName = computed(() => (fname.value + ' ' + lname.value).trim())
watch(fullName, (newVal) => { student.value.name = newVal })


const validateField = (field, value) => {
    if (!value && field !== 'name') return `${field.replace('_', ' ')} is required`
    switch (field) {
        case 'reg_no':
            if (!/^[0-9]{2}[A-Z]{3}[0-9]{4}$/.test(value)) return 'Format: 24MCA0010'
            break
        case 'name':
            if (!value || value.length < 3) return 'Minimum 3 characters required'
            break
        case 'phone':
            if (!/^[0-9]{10}$/.test(value)) return 'Must be 10 digits'
            break
        case 'email':
            if (!/^\S+@\S+\.\S+$/.test(value)) return 'Invalid email'
            break
    }
    return null
}

watch(student, (newVal) => {
    if (!newVal) return

    Object.keys(newVal).forEach((field) => {
        const error = validateField(field, newVal[field])
        if (error && (newVal[field] !== '' || formSubmitted.value)) {
            errors.value[field] = error
        } else {
            delete errors.value[field]
        }
    })
}, { deep: true, immediate: true })

const handleSubmit = () => {
    formSubmitted.value = true
    const newErrors = {}
    Object.keys(student.value).forEach(field => {
        const error = validateField(field, student.value[field])
        if (error) newErrors[field] = error
    })
    errors.value = newErrors

    if (Object.keys(newErrors).length === 0) {
        emit('submit') 
        fname.value = ""
        lname.value = ""
        formSubmitted.value = false
    }
}
</script>

<template>
    <Header></Header>
    <div class="student_form" v-if="student">
        <h1>Add Student</h1>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label>Register Number:</label>
                <input type="text" v-model="student.reg_no" v-focus :class="{ 'invalid': errors.reg_no }">
                <p class="error" v-if="errors.reg_no">{{ errors.reg_no }}</p>
            </div>
            <div class="form-group" v-capitalize>
                <label>First Name:</label>
                <input type="text" v-model="fname">
            </div>
            <div class="form-group" v-capitalize>
                <label>Last Name:</label>
                <input type="text" v-model="lname">
            </div>
            <div class="form-group">
                <strong>Full Name:</strong> {{ student.name || '---' }}
                <p class="error" v-if="errors.name">{{ errors.name }}</p>
            </div>
            <div class="form-group">
                <label>Gender:</label>
                <div class="radio_group">
                    <label><input type="radio" value="Male" v-model="student.gender"> Male</label>
                    <label><input type="radio" value="Female" v-model="student.gender"> Female</label>
                    <p class="error" v-if="errors.gender">{{ errors.gender }}</p>
                </div>
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
                <label>Course:</label>
                <select v-model="student.course" :class="{ 'invalid': errors.course }">
                    <option value="">Select Course</option>
                    <option value="MCA">MCA</option>
                    <option value="MSC">MSC</option>
                    <option value="MBA">MBA</option>
                    <option value="MTech">MTech</option>
                    <option value="ME">ME</option>
                    <option value="BTech">BTech</option>
                    <option value="BE">BE</option>
                </select>
                <p class="error" v-if="errors.course">{{ errors.course }}</p>
            </div>
            <button type="submit">Submit Student</button>
        </form>
        </div>
</template>

<style scoped>
.student_form {
  background: white;
  padding-right: 30px;
  padding-left: 30px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  border-color: #000000;
  min-width: 400px;
  max-width: 700px;
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
select {
    width: 100%;
    padding: 12px;
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    background-color: white;
    font-size: 1rem;
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
</style>