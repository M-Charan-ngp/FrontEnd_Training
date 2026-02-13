<script setup>
import { reactive, watch } from 'vue'

const emit = defineEmits(['filterChange'])

const filters = reactive({
    search: '',
    sortBy: 'regNo' 
})

const sortOptions = [
    { title: 'Sort by Name', value: 'name' },
    { title: 'Sort by Reg No', value: 'regNo' }
]

let timeout = null

watch(filters, (newVal) => {
    clearTimeout(timeout)
    
    timeout = setTimeout(() => {
        emit('filterChange', { ...newVal })
    }, 500)
})
</script>

<template>
    <v-sheet class="pa-4 bg-transparent d-flex justify-end">
        <div class="d-flex ga-4 align-right" style="max-width: 600px; width: 100%;">
            
            <v-text-field
                v-model="filters.search"
                prepend-inner-icon="mdi-magnify"
                label="Search Student Name or Reg No."
                variant="outlined"
                density="compact"
                hide-details
                clearable
                bg-color="white"
            ></v-text-field>

            <v-select
                v-model="filters.sortBy"
                :items="sortOptions"
                label="Sort By"
                variant="outlined"
                density="compact"
                hide-details
                style="max-width: 200px;"
                bg-color="white"
            ></v-select>
        </div>
    </v-sheet>
</template>