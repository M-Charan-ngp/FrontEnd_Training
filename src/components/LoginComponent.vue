<script setup>
import { vFocus, vCapitalize } from '@/composables/custom_directives.js'
import { useAuthStore } from '../stores/AuthStore'
const emit = defineEmits(['success'])
const credentials = defineModel({ required: true })

const authstore = useAuthStore()

const emailrule = [
    value => {
      if (value){
        if(!/^\S+@\S+\.\S+$/.test(value))
            return 'Invalid email'
        return true
      }  
      return 'Email is compulsoy.'
    },
  ]
const passwordrule = [
    value => {
        if(value) return true
        return "Password is compulsory"
    }
]

const handlesubmit = () => {
    if (credentials.value.email && credentials.value.password) {
        emit('success')
    }
    else {
        alert("Please enter both email and password")
    }
}
</script>

<template>
    <v-card 
        class="mx-auto pa-8 pb-8" 
        width="400" 
        elevation="8" 
        rounded="lg"
    >
        <h2 class="text-h4 font-weight-black text-center mb-6">Login</h2>

        <v-form @submit.prevent="handlesubmit">
            <v-text-field
                v-model="credentials.email"
                label="Email"
                placeholder="johndoe@example.com"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                :rules="emailrule"
                v-focus
                class="mb-2"
            ></v-text-field>

            <v-text-field
                v-model="credentials.password"
                :rules="passwordrule"
                label="Password"
                type="password"
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                class="mb-4"
            ></v-text-field>

            <v-btn
                type="submit"
                color="success"
                size="large"
                variant="elevated"
                block
                lass="mb-8"
            >
                Log In
            </v-btn>
        </v-form>
    </v-card>
</template>
