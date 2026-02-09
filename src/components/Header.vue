<script setup>
import { inject } from 'vue'

const title = inject('title')
const theme = inject('theme')
</script>

<template>
    <div class="header">
        <h1>{{ title }}</h1>
    </div>
</template>

<style scoped>
.header {
  background-color: v-bind(theme);
  color: white;
  width: 100%;
  
  padding: 10px 10px 10px 10px;
  text-align: center;
}
</style>
