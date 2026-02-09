<script setup>
import {ref} from 'vue'
import LoginComponent from '@/components/LoginComponent.vue'
import RegisterComponent from '@/components/RegisterComponent.vue'

    const loginData = ref({
        email: '',
        password: ''
    })

    const registerData = ref({
        name: '',
        email: '',
        password: ''
    })
    const directToDashboard = () =>{
        alert("login success")
    }
    const handleRegister = () =>{
        alert("Registration success Proceed to login")
        toggleLogin.value = true;
    }
    const toggleLogin = ref(true)
</script>
<template>
    <div class="main">
        <div class="controlButtons">
            <button @click="toggleLogin=true" :disabled="toggleLogin">Login </button>
            <button @click="toggleLogin=false" :disabled="!toggleLogin">Register</button>
        </div>
        <div v-if="toggleLogin">
            <!-- <span>This is the login page</span> -->
            <LoginComponent @success="directToDashboard" v-model="loginData"></LoginComponent>
        </div>
        <div v-else>
            <!-- <span>This is the register page</span> -->
            <RegisterComponent @success="handleRegister" v-model="registerData"></RegisterComponent>
        </div>  
    </div>

</template>

<style scoped>
.main{
    width: 100%;
    min-width: 100px;
}
.controlButtons {
    display: flex;
    justify-content: center; 
    align-items: center;
    gap: 40px;
    margin: 20px 0;
    width: 100%; 
}
button:hover  {
  background-color: #d1dad6;
}
button {
  background-color: #fafafa; 
  color: rgb(0, 0, 0);
  border:1px solid #33a06f;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
  cursor: pointer;
}

button:disabled{
    background-color: #42b883;
    color:black;
    cursor:not-allowed;
}
</style>