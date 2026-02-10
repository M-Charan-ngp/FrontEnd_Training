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
          @success="directToDashboard"
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