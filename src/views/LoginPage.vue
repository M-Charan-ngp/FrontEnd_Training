<script setup>
import {ref} from 'vue'
import LoginComponent from '@/components/LoginComponent.vue'
import RegisterComponent from '@/components/RegisterComponent.vue'
import apiService from '../services/apiServices'
import { jwtDecode } from 'jwt-decode'
import {useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import { useAuthStore } from '../stores/AuthStore'
const authStore = useAuthStore()

const router = useRouter()
    const loginData = ref({
        email: '',
        password: ''
    })

    const registerData = ref({
        name: '',
        email: '',
        password: '',
        role:'user'
    })


const handleLogin = async () => {
    try {
        const response = await apiService.auth.login(loginData.value);
        const token = response.token || response.data?.token;

        if (!token) {
            throw new Error("Token not found in server response");
        }
        authStore.saveLogin(token);
        const userRole = authStore.user?.role;
        router.push(userRole === 'admin' ? '/studentdata' : '/cart');

        alert(`Welcome back, ${authStore.user?.name || 'User'}!`);

    } catch (err) {
        console.error("Login Error:", err);
        const message = err.response?.data?.message || err.response?.data?.error || "Login failed";
        alert(message);
    }
}
const handleRegister = async () => {
    try {
        const response = await apiService.auth.signup({ ...registerData.value });
        
        alert(response.data?.message || 'Registration successful! Please login.');
        toggleLogin.value = true;
        registerData.value = { name: '', email: '', password: '', role: 'user' };

    } catch (err) {
        console.error("Registration Error:", err);
        if (err.response?.status === 401) {
            alert("System Error: " + (err.response.data.error || "Invalid API Key"));
        } else if (err.response?.status === 400 || err.response?.status === 422) {
            alert(err.response.data?.message || "This email is already registered.");
        } else {
            alert("Connection error. Please try again later.");
        }
    }
}
    const toggleLogin = ref(true)
</script>
<template>
  <v-container fluid class="fill-height d-flex justify-center align-start pt-16">
    
    <div style="width: 100%; max-width: 450px;" class="d-flex flex-column">
      
      <div class="d-flex justify-center gap-4 mb-10" style="height: 50px;">
        <v-btn 
          :variant="toggleLogin ? 'elevated' : 'outlined'" 
          color="success"
          width="140" 
          @click="toggleLogin = true"
        >
          Login
        </v-btn>
        
        <v-btn 
          :variant="!toggleLogin ? 'elevated' : 'outlined'" 
          color="success"
          width="140" 
          @click="toggleLogin = false"
        >
          Register
        </v-btn>
      </div>

      <div class="form-container">
        <LoginComponent 
          v-if="toggleLogin" 
          v-model="loginData" 
          @success="handleLogin"
        />
        <RegisterComponent 
          v-else 
          v-model="registerData" 
          @success="handleRegister"
        />
      </div>

    </div>
  </v-container>
</template>

<style scoped>
.gap-4 {
  gap: 16px;
}

:deep(.v-card) {
  width: 100% !important;
}
</style>