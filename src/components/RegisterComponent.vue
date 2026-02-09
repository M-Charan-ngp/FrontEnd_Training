<script setup>
import { ref } from 'vue'

const newUser = defineModel({required:true})
const emit = defineEmits(['success'])

const confirmPassword = ref('')

const handleSubmit = () => {
    if(!newUser.value.name||!newUser.value.email||!newUser.value.password){
        alert("please fill all the values")
        return
    }
    if (newUser.value.password !== confirmPassword.value){
        alert("password do not match!")
        return
    }
    emit('success')
}
</script>

<template>
    <div class="card">
        <h2>Register</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label>Name</label>
                <input type="text" v-focus v-capitalize v-model="newUser.name">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" v-model="newUser.email">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="newUser.password">
            </div>
            <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" v-model="confirmPassword">
            </div>
            <button type="submit" class="auth-btn register">Register</button>
        </form>
    </div>
</template>

<style scoped>
h2 {
    font-size: 1.8rem;
    font-weight: 800;
    text-align: center;
    position: relative;
    letter-spacing: -0.5px;
}
.card {
    min-width: 400px;
    max-width: 100%;
    margin: 1rem auto;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.form-group {
    margin-bottom: 1.2rem;
    display: flex;
    flex-direction: column;
    text-align: left;
}

label {
    font-size: 18px;
    margin-bottom: 2px;
    color: #000000;
}

input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    outline: none;
}

input:focus {
    border-color: #42b883;
}

button {
    width: 100%;
    padding: 12px;
    background: #42b883;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
}

</style>