<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
  <div class="app-container">
      <RouterView />
  </div>
  </v-app>
  
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
}

header {
  background-color: #42b883;
  color: white;
  width: 100%;

  padding: 10px 0 10px 0px;
  text-align: center;
}
</style>