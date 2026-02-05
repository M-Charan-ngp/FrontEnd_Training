<script setup>
import { reactive, watch } from 'vue'

const emit = defineEmits(['filterChange'])

const filters = reactive({
    search: '',
    sortBy: 'name'
})

watch(filters, (newVal) => {
    emit('filterChange', { ...newVal })
})
</script>

<template>
    <header class="header-filters">
        <div class="controls">
            <div class="control-group">
                <input 
                    type="text" 
                    v-model="filters.search" 
                    placeholder="Search name"
                    class="search-input"
                />
            </div>

            <div class="control-group">
                <select v-model="filters.sortBy">
                    <option value="name">Sort by Name</option>
                    <option value="reg_no">Sort by Reg No</option>
                </select>
            </div>
        </div>
    </header>
</template>

<style scoped>
.header-filters {
    display: flex;
    justify-content: end;
    align-items: end;
    background-color: #ffffff;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
}

.controls {
    display: flex;
    gap: 15px;
    align-items: center;
}

.control-group input, 
.control-group select {
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    outline: none;
    font-size: 0.9rem;
}

.search-input {
    min-width: 250px;
}

.control-group select {
    background-color: white;
    cursor: pointer;
}
</style>