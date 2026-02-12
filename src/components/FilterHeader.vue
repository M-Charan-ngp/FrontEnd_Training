<script setup>
import { reactive, watch } from 'vue'

const emit = defineEmits(['filterChange'])

const filters = reactive({
    search: '',
    sortBy: 'reg_no'
})
const sortOptions = [
    { title: 'Sort by Name', value: 'name' },
    { title: 'Sort by Reg No', value: 'reg_no' }
]
watch(filters, (newVal) => {
    emit('filterChange', { ...newVal })
})
</script>
<template>
    <v-sheet class="pa-4 bg-transparent d-flex justify-end">
        <div class="d-flex ga-4 align-right" style="max-width: 400px; width: 100%;">
            
            <v-text-field
                v-model="filters.search"
                prepend-inner-icon="mdi-magnify"
                label="Search name/ Reg No."
                variant="outlined"
                density="compact"
                hide-details
                clearable
            ></v-text-field>

            <v-select
                v-model="filters.sortBy"
                :items="sortOptions"
                label="Sort By"
                variant="outlined"
                density="compact"
                hide-details
                style="max-width: 200px;"
            ></v-select>

        </div>
    </v-sheet>
</template>