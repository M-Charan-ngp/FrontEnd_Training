<script setup>
import { ref } from 'vue'
import { vFocus, vCapitalize } from '@/composables/custom_directives.js'
const newUser = defineModel({ required: true })
const emit = defineEmits(['success'])

const confirmPassword = ref('')
const togglepass = ref(false) 
const toggleconfirmpass = ref(false)
const items=['user','admin']
const emailrule = [
    value => {
      if (value){
        if(!/^\S+@\S+\.\S+$/.test(value))
            return 'Invalid email'
        return true
      }  
      return 'Email is compulsory.'
    },
  ]
const rule = [
    value => {
        if(value) return true
        return `${value.label} is compulsory`
    }    
]
const handleSubmit = () => {
    if (!newUser.value.name || !newUser.value.email || !newUser.value.password) {
        alert("Please fill all the values")
        return
    }
    if (newUser.value.password !== confirmPassword.value) {
        alert("Passwords do not match!")
        return
    }
    emit('success')
}
</script>

<template>
  <v-card class="mx-auto pa-8 pb-8" elevation="8" min-width="400" rounded="lg">
    <h2 class="text-h4 font-weight-black text-center mb-6">Register</h2>

    <v-form @submit.prevent="handleSubmit">
      <v-text-field
        v-model="newUser.name"
        v-focus
        v-capitalize
        :rules="rule"
        label="Name"
        density="compact"
        placeholder="Full Name"
        prepend-inner-icon="mdi-account"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model="newUser.email"
        density="compact"
        placeholder="johndoe@example.com"
        :rules="emailrule"
        label="Email"
        prepend-inner-icon="mdi-email"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model="newUser.password"
        :append-inner-icon="togglepass ? 'mdi-eye' : 'mdi-eye-off'"
        :type="togglepass ? 'text' : 'password'"
        :rules="rule"
        density="compact"
        label="Password"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock"
        variant="outlined"
        @click:append-inner="togglepass = !togglepass"
      ></v-text-field>

      <v-text-field
        v-model="confirmPassword"
        :append-inner-icon="toggleconfirmpass ? 'mdi-eye' : 'mdi-eye-off'"
        :type="toggleconfirmpass ? 'text' : 'password'"
        :rules="rule"
        density="compact"
        placeholder="Confirm your password"
        label="Confirm Password"
        prepend-inner-icon="mdi-lock-check"
        variant="outlined"
        @click:append-inner="toggleconfirmpass = !toggleconfirmpass"
      ></v-text-field>
      <v-select
        v-model="newUser.role"
        :items="items"
        label="Role"
      ></v-select>
      <v-btn
        type="submit"
        block
        class="mb-8"
        color="success"
        size="large"
        variant="elevated"
      >
        Register
      </v-btn>
    </v-form>
  </v-card>
</template>
