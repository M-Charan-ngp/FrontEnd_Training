<script setup>
import { reactive, computed, ref, watch } from 'vue'

    const student = reactive({
        reg_no: '',
        name:'',
        gender:'',
        dob:'',
        phone:'',
        email:'',
        city:''
    })
    const errors = ref({})
    const validate = () => {
        const newErrors = {}

        if (!student.reg_no) {
            newErrors.reg_no = 'Register number is required'
        } else if (!/^[0-9]{2}[A-Z]{3}[0-9]{4}$/.test(student.reg_no)) {
            newErrors.reg_no = 'Format: 24MCA0010'
        }
        if (!student.name) {
            newErrors.name = 'Name is required'
        } else if (student.name.length < 3) {
            newErrors.name = 'Minimum 3 characters required'
        } else if (!/^[A-Za-z\s]+$/.test(student.name)) {
            newErrors.name = 'Only alphabets allowed'
        }
        if (!student.gender) newErrors.gender = 'Please select gender'
        if (!student.dob) newErrors.dob = 'Date of birth is required'
        

        if (!student.phone) {
            newErrors.phone = 'Phone number is required'
        } else if (!/^[0-9]{10}$/.test(student.phone)) {
            newErrors.phone = 'Must be exactly 10 digits'
        }
        if (!student.email) {
            newErrors.email = 'Email is required'
        } else if (!/^\S+@\S+\.\S+$/.test(student.email)) {
            newErrors.email = 'Invalid email format'
        }
        if (!student.city) newErrors.city = 'City is required'

        errors.value = newErrors
        return Object.keys(newErrors).length === 0
    }

    watch(student, () => {
        validate()
    }, { deep: true })

const handleSubmit = () => {
  if (validate()) {
    console.log("New Student Data: ", student)
    studentList.value.push({ ...student })
    showToast(`Student added successfully`)
    Object.keys(student).forEach(key => student[key] = '')
  } else {
    alert("Validation failed.")
  }
}
    const studentList = ref([
    ])

    const isFormValid = computed(() => {
        return Object.values(student).every(value => value.trim() !== "")
    })

</script>
<template>
    <div class="container">
        <div class="student_form">
        <h1>Add Student</h1>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label>Student Register Number: </label>
                <input type="text" 
                v-model="student.reg_no" 
                pattern="[0-9]{2}[A-Z]{3}[0-9]{4}" 
                placeholder="eg:24ABC0000" 
                :class="{ 'invalid': errors.reg_no }">
                <p class="error" v-if="errors.reg_no">{{ errors.reg_no }}</p>
            </div>

            
            <div class="form-group">
                <label>Student Name: </label>
                <input type="text" v-model="student.name" placeholder="Name" :class="{ 'invalid': errors.name }">
                <p class="error" v-if="errors.name">{{ errors.name }}</p>
            </div>
            
            <div class="form-group">
                <label>Student Gender: </label>
                <div class="radio_group">
                    <input type="radio" name="gender" value="Male" v-model="student.gender">Male
                    <input type="radio" name="gender" value="Female" v-model="student.gender">Female
                    <p class="error" v-if="errors.gender">{{ errors.gender }}</p>
                </div>
            </div>
            <div class="form-group">
                <label> Date of birth:</label>
                <input type="date" v-model="student.dob" :class="{ 'invalid': errors.dob }">
                <p class="error" v-if="errors.dob">{{ errors.dob }}</p>
            </div>
            <div class="form-group">
                <label>Student E-mail: </label>
                <input type="email" v-model="student.email" placeholder="eg:abc@xyz.com" :class="{ 'invalid': errors.name }">
                <p class="error" v-if="errors.email">{{ errors.email }}</p>
            </div>
            <div class="form-group">
                <label>Student Phone Number: </label>
                <input type='text' v-model="student.phone" placeholder="eg:9876543210" :class="{ 'invalid': errors.phone }">
                 <p class="error" v-if="errors.phone">{{ errors.phone }}</p>
            </div>
            <div class="form-group">
                <label>Student City: </label>
                <input type="text" v-model="student.city" placeholder="city" :class="{ 'invalid': errors.city }">
                 <p class="error" v-if="errors.city">{{ errors.city }}</p>
            </div>
            <button type="submit" :disabled="Object.keys(errors).length > 0">Submit</button>
        </form>
    </div>
    <div class="table-view" v-if="studentList[0]">
        <table>
          <thead>
              <tr>
                    <th v-for="(,key) in studentList[0]">{{ key }}</th>
              </tr>
          </thead>
          <tbody>
            <tr v-for="student in studentList" :key="student.reg_no">
                <td>{{ student.reg_no }}</td>
                <td>{{ student.name }}</td>
                <td>{{ student.gender }}</td>
                <td>{{ student.dob }}</td>
                <td>{{ student.phone }}</td>
                <td>{{ student.email }}</td>
                <td>{{ student.city}}</td>
            </tr>
            </tbody>
      </table>
    </div>
    <div v-else class="empty-view">
        <h1>No Student data Found......</h1>
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
  width: 90%;
  max-width: 1000px;
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
</style>