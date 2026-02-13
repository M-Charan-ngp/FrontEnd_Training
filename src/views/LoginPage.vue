<script setup>
import { ref, computed } from 'vue'
import LoginComponent from '@/components/LoginComponent.vue'
import RegisterComponent from '@/components/RegisterComponent.vue'
import {useRouter } from 'vue-router'
import { useAuthStore } from '../stores/AuthStore'
const authStore = useAuthStore()
const themeColor = computed(() => authStore.themeColor)
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
    const result = await authStore.login(loginData.value);
    
    if (result.success) {
        alert(`Welcome back, ${result.user.name}!`);
        router.push(result.user.role === 'admin' ? '/student-form' : '/studentdata');
    } else {
        alert(result.error);
    }
}

const handleRegister = async () => {
    const result = await authStore.register({ ...registerData.value });
    
    if (result.success) {
        alert(result.message);
        toggleLogin.value = true;
        registerData.value = { name: '', email: '', password: '', role: 'user' };
    } else {
        alert(result.error);
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
          :color="themeColor"
          width="140" 
          @click="toggleLogin = true"
        >
          Login
        </v-btn>
        
        <v-btn 
          :variant="!toggleLogin ? 'elevated' : 'outlined'" 
          :color="themeColor"
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