<template>
  <v-dialog v-model="internalValue" max-width="500" scrollable>
    <v-card rounded="lg">
      <v-toolbar :color="themeColor" flat>
        <v-toolbar-title class="text-white font-weight-bold">
          Enrolled Courses
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="internalValue = false">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-4" style="height: 400px;">
        <div v-if="loading" class="d-flex flex-column align-center justify-center fill-height">
          <v-progress-circular indeterminate :color="themeColor" size="64" />
          <div class="mt-4 text-grey">Loading academic records...</div>
        </div>

        <template v-else>
          <div v-if="studentInfo" class="mb-4">
            <div class="text-h6">{{ studentInfo.name }}</div>
            <div class="text-caption text-grey">Reg No: {{ studentInfo.regNo }}</div>
          </div>

          <v-divider class="mb-4"></v-divider>

          <v-list v-if="courses && courses.length > 0" lines="two">
        <v-list-item
            v-for="course in courses"
            :key="course.subjectId"  border
            class="mb-2 rounded-lg"
            prepend-icon="mdi-notebook-outline"
        >
            <v-list-item-title class="font-weight-bold">
            {{ course.title }}
            </v-list-item-title>
            
            <v-list-item-subtitle>
            ID: {{ course.subjectId }}
            </v-list-item-subtitle>
            
            <template v-slot:append>
            <v-chip size="small" :color="themeColor" variant="tonal">
                Enrolled
            </v-chip>
            </template>
        </v-list-item>
        </v-list>

          <v-alert
            v-else
            type="info"
            variant="tonal"
            icon="mdi-information-outline"
            text="This student is not yet enrolled in any courses."
          />
        </template>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useStudentStore } from '../stores/student'

const props = defineProps({
  modelValue: Boolean,
  studentId: Number,
  themeColor: String
})

const emit = defineEmits(['update:modelValue'])
const studentStore = useStudentStore()

const loading = ref(false)
const studentInfo = ref(null)
const courses = ref([])

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
watch(() => props.modelValue, async (isOpen) => {
  if (isOpen && props.studentId) {
    loading.value = true
    try {
      const result = await studentStore.fetchStudentById(props.studentId)
      if (result.success && result.data) {
        studentInfo.value = result.data
        courses.value = result.data.enrolledCourses || []
      }
    } catch (error) {
      console.error("Error loading courses:", error)
    } finally {
      loading.value = false
    }
  }
})

</script>