<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import { useDepartmentStore } from '../stores/department'

const deptStore = useDepartmentStore()
onMounted(() => {
    deptStore.fetchDepartments()
})
const emit = defineEmits(['submit'])
const student = defineModel({ required: true })
const form = ref(null) 

const fname = ref("")
const lname = ref("")

const fullName = computed(() => (fname.value + ' ' + lname.value).trim())
watch(fullName, (newVal) => { student.value.name = newVal })

watch(() => student.value, (newVal) => {
    if (newVal && newVal.name && !fname.value && !lname.value) {
        const parts = newVal.name.trim().split(' ')
        fname.value = parts[0] || ''
        lname.value = parts.slice(1).join(' ') || ''
    }
}, { immediate: true, deep: true })

const rules = {
    required: v => !!v || 'This field is required',
    regNo: v => /^[0-9]{2}[A-Z]{3}[0-9]{4}$/.test(v) || 'Format: 24MCA0010',
    name: v => (v && v.length >= 3) || 'Minimum 3 characters required',
    // dob: v => (v && v.validate &&)
    phone: v => /^[0-9]{10}$/.test(v) || 'Must be 10 digits',
    email: v => /^\S+@\S+\.\S+$/.test(v) || 'Invalid email',
}

const handleSubmit = async () => {
    const { valid } = await form.value.validate()
    
    if (valid) {
        emit('submit')
        fname.value = ""
        lname.value = ""
    }
}
</script>

<template>
    <Header></Header>
    <v-container class="student_form mt-6" v-if="student">
        <v-form ref="form" @submit.prevent="handleSubmit">
            <v-text-field
                label="Register Number"
                v-model="student.regNo"
                :rules="[rules.required, rules.regNo]"
                variant="outlined"
            />

            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field
                        label="First Name"
                        v-capitalize
                        v-model="fname"
                        :rules="[rules.required]"
                        variant="outlined"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field
                        label="Last Name"
                        v-capitalize
                        v-model="lname"
                        variant="outlined"
                    />
                </v-col>
            </v-row>

            <div class="mb-4">
                <strong>Full Name:</strong> {{ student.name || '---' }}
            </div>

            <label class="font-weight-bold">Gender</label>
            <v-radio-group v-model="student.gender" inline :rules="[rules.required]">
                <v-radio label="Male" value="Male" color="success" />
                <v-radio label="Female" value="Female" color="success" />
            </v-radio-group>

            <v-text-field
                label="Date of Birth"
                type="date"
                v-model="student.dob"
                :rules="[rules.required]"
                variant="outlined"
                persistent-placeholder
            />

            <v-text-field
                label="Student E-mail"
                v-model="student.email"
                placeholder="eg:abc@xyz.com"
                :rules="[rules.required, rules.email]"
                variant="outlined"
            />

            <v-text-field
                label="Student Phone Number"
                v-model="student.phone"
                placeholder="eg:9876543210"
                :rules="[rules.required, rules.phone]"
                variant="outlined"
            />

            <v-select
            label="Select Department"
            :items="deptStore.departmentOptions"
            v-model="student.departmentId"
            :loading="deptStore.isLoading"
        ></v-select>

            <v-btn 
                type="submit" 
                block 
                color="#42b883" 
                size="large" 
                class="mt-4 text-white font-weight-bold"
            >
                Submit Student
            </v-btn>
        </v-form>
    </v-container>
</template>

<style scoped>
.student_form {
  background: white;
  padding: 30px;
  border-radius: 12px;
  min-width: 500px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
</style>