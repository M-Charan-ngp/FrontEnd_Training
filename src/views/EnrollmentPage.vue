<template>
    <Header></Header>
  <v-container class="mt-15 pt-16" width="800px">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="elevation-3 rounded-lg">
          <v-toolbar :color="themeColor" dark>
            <v-toolbar-title class="font-weight-bold text-white">
              <v-icon icon="mdi-school" class="mr-2" />
              Enrollment Management
            </v-toolbar-title>
          </v-toolbar>

          <v-tabs v-model="activeTab" grow :color="themeColor">
            <v-tab value="single">Single Enrollment</v-tab>
            <v-tab value="bulk">Bulk Enrollment</v-tab>
          </v-tabs>

          <v-window v-model="activeTab" class="pa-6">
            <v-window-item value="single">
              <p class="text-subtitle-2 text-grey-darken-1 mb-4">
                Assign a specific course to an individual student.
              </p>
              <v-form ref="singleForm" @submit.prevent="handleSingleEnroll">
                <v-autocomplete
                    v-model="singleData.studentId"
                    :items="studentStore.students"
                    item-title="name"
                    item-value="id" label="Select Student"
                    variant="outlined"
                    ></v-autocomplete>

                    <v-autocomplete
                    v-model="singleData.courseId"
                    :items="studentStore.courses"
                    item-title="title"
                    item-value="courseId" label="Select Course"
                    variant="outlined"
                    ></v-autocomplete>

                <v-btn
                  type="submit"
                  block
                  size="large"
                  :color="themeColor"
                  class="mt-6 text-white font-weight-bold"
                  :loading="studentStore.isLoading"
                  :disabled="!singleData.studentId || !singleData.courseId"
                >
                  Confirm Enrollment
                </v-btn>
              </v-form>
            </v-window-item>

            <v-window-item value="bulk">
              <p class="text-subtitle-2 text-grey-darken-1 mb-4">
                Enroll multiple students into one course at once.
              </p>
              <v-form ref="bulkForm" @submit.prevent="handleBulkEnroll">
                <v-select
                v-model="bulkData.courseId"
                :items="studentStore.courses"
                item-title="title"
                item-value="courseId"  
                label="Target Course"
                variant="outlined"
                ></v-select>

                <v-autocomplete
                  v-model="bulkData.studentIds"
                  :items="studentStore.students"
                  item-title="name"
                  item-value="id"
                  label="Select Students"
                  variant="outlined"
                  multiple
                  chips
                  closable-chips
                  prepend-inner-icon="mdi-account-group"
                  class="mt-2"
                  required
                ></v-autocomplete>

                <v-btn
                  type="submit"
                  block
                  size="large"
                  :color="themeColor"
                  class="mt-6 text-white font-weight-bold"
                  :loading="studentStore.isLoading"
                  :disabled="!bulkData.courseId || bulkData.studentIds.length === 0"
                >
                  Enroll {{ bulkData.studentIds.length }} Students
                </v-btn>
              </v-form>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Header from '../components/Header.vue'
import { ref, onMounted } from 'vue'
import { useStudentStore } from '../stores/student'
import { useAuthStore } from '../stores/AuthStore'
import { storeToRefs } from 'pinia'

const studentStore = useStudentStore()
const authStore = useAuthStore()
const { themeColor } = storeToRefs(authStore)

const activeTab = ref('single')
const singleData = ref({ studentId: null, courseId: null })
const bulkData = ref({ courseId: null, studentIds: [] })

onMounted(async () => {
  await Promise.all([
    studentStore.fetchStudents(),
    studentStore.fetchCourses()
  ])
})

const handleSingleEnroll = async () => {
  const res = await studentStore.enrollInCourse(
    singleData.value.studentId, 
    singleData.value.courseId
  )
  
  if (res.success) {
    alert(res.message || 'Enrollment successful!')
    singleData.value = { studentId: null, courseId: null }
  }
}

const handleBulkEnroll = async () => {
  const res = await studentStore.bulkEnrollInCourse(
    bulkData.value.courseId, 
    bulkData.value.studentIds
  )

  if (res.success) {
    alert(res.message || 'Bulk enrollment successful!')
    bulkData.value = { courseId: null, studentIds: [] }
  }
}
</script>

<style scoped>
.v-card {
  transition: transform 0.2s ease-in-out;
}
</style>