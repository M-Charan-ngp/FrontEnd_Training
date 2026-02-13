<script setup>
const props = defineProps({
    headers: {
        type: Array,
        required: true
    },
    data: {
        type: Array,
        required: true,
    }
})
const emit = defineEmits(['next', 'prev', 'request-delete', 'request-update'])
</script>
<template>
    <v-card v-if="data.length > 0" class="table-card elevation-2">
        <v-table hover fixed-header density="comfortable">
            <thead>
                <tr>
                    <th 
                        v-for="header in headers" 
                        :key="header" 
                        class="text-uppercase font-weight-bold bg-success text-white"
                    >
                        {{ header }}
                    </th>
                    <th class="text-uppercase font-weight-bold bg-success text-white text-center">Delete</th> 
                    <th class="text-uppercase font-weight-bold bg-success text-white text-center">Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in data" :key="row.id">
                    <td>{{ row.id }}</td>
                    <td class="font-weight-bold">{{ row.regNo }}</td>
                    <td>{{ row.name }}</td>
                    <td>{{ row.gender }}</td>
                    <td>{{ row.dob ? row.dob.split('T')[0] : '' }}</td>
                    <td>{{ row.phone }}</td>
                    <td>{{ row.email }}</td>
                    <td>{{ row.departmentInfo?.name || 'N/A' }}</td>
                    
                    <td class="text-center">
                        <v-btn icon="mdi-delete" color="error" variant="text" @click="$emit('request-delete', row)" />
                    </td>
                    <td class="text-center">
                        <v-btn icon="mdi-pencil" color="success" variant="text" @click="$emit('request-update', row)" />
                    </td>
                </tr>
            </tbody>
        </v-table>

        <v-divider></v-divider>
        <div class="d-flex justify-center pa-4">
            <slot name="pagination"></slot>
        </div>
    </v-card>

    <v-sheet v-else class="d-flex align-center justify-center pa-10 text-center" color="grey-lighten-4" border>
        <div>
            <v-icon icon="mdi-database-off" size="large" color="grey" class="mb-2"></v-icon>
            <p class="text-grey">No data available to display.</p>
        </div>
    </v-sheet>
</template>

<style scoped>

.table-card {
    flex: 2;
    margin-left: 20px;
    min-width: 600px;
    border-radius: 8px;
    overflow: hidden;
}

:deep(thead th) {
    height: 50px !important;
}
</style>