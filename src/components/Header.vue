<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { computed } from 'vue'
import { useAuthStore } from '../stores/AuthStore'
const authStore = useAuthStore()

const isLoggedIn = computed(() => {
  return !!authStore.token 
})
const title = inject('title') || "WELCOME"
const themeColor = computed(() => authStore.themeColor)
const toggleTheme = () => {
    themeColor.value = themeColor.value === '#42b883' ? '#35495e' : '#42b883'
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
  alert("Logged out successfully")
}

const navigateToTable = () => {
  router.push('/studentdata')
}
</script>

<template >
  <v-app-bar :color="themeColor" >
    
    <v-btn 
      variant="outlined" 
      class="ml-2"
      rounded="pill"
      @click="navigateToTable"
    >
      View Student
    </v-btn>

    <v-app-bar-title class="text-center mr-16 text-h4">
      {{ title }}
    </v-app-bar-title>
      <v-btn 
      v-if="isLoggedIn"
      icon="mdi-logout" 
      
      class="ml-2 mr-2"
      variant="outlined" 
      @click="handleLogout"
    >
    </v-btn>
    <v-btn 
      icon="mdi-theme-light-dark" 
      class="mr-2 ml-16"
      variant="outlined"
      @click="toggleTheme"
      tooltip="Switch Theme"
    >
    
    </v-btn>
    
  </v-app-bar>
</template>

