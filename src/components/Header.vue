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
    const nextColor = authStore.themeColor === '#42b883' ? '#35495e' : '#42b883'
    authStore.setTheme(nextColor)
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
  alert("Logged out successfully")
}

const navigateToTable = () => {
  router.push('/studentdata')
}
const navigateToEnrollment = () => {
  router.push('/Enrollment')
}
const navigateToForm = () => {
  router.push('/student-form')
}
</script>
<template>
  <v-app-bar :color="themeColor" flat border-b>
    
    <div v-if="isLoggedIn" class="d-flex align-center ml-2" style="z-index: 2;">
      <v-tabs v-model="activeTab" bg-color="transparent" slider-color="white" color="white" density="compact">
        <v-tab to="/studentdata" class="text-capitalize px-3">Students</v-tab>
        <v-tab to="/student-form" class="text-capitalize px-3">Create</v-tab>
        <v-tab to="/Enrollment" class="text-capitalize px-3">Enrollment</v-tab>
      </v-tabs>
    </div>

    <div class="d-flex justify-center align-center position-absolute w-100 h-100 pointer-events-none" style="left: 0; z-index: 1;">
      <v-app-bar-title class="text-h5 font-weight-bold text-center" style="flex: none;">
        {{ title }}
      </v-app-bar-title>
    </div>

    <v-spacer />

    <div class="d-flex align-center mr-2" style="z-index: 2;">
      <v-btn icon density="comfortable" variant="text" @click="toggleTheme">
        <v-icon>mdi-theme-light-dark</v-icon>
        <v-tooltip activator="parent" location="bottom">Switch Theme</v-tooltip>
      </v-btn>

      <v-btn v-if="isLoggedIn" icon density="comfortable" variant="tonal" class="ml-2" @click="handleLogout">
        <v-icon>mdi-logout</v-icon>
        <v-tooltip activator="parent" location="bottom">Logout</v-tooltip>
      </v-btn>
    </div>
    
  </v-app-bar>
</template>

<style scoped>
.pointer-events-none {
  pointer-events: none;
}
.v-app-bar-title {
  pointer-events: auto;
}
</style>