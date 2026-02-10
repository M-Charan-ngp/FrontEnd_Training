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
    <div class="table-view" v-if="data.length > 0">
        <v-table>
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header">{{ header }}</th>
                    <th>Delete</th> 
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in data" :key="row.id">
                    <td v-for="(value) in row">{{ value }}</td>
                    <td>
                        <v-btn icon="mdi-delete" color="red" variant="text" @click="$emit('request-delete', row)" />
                    </td>
                    <td>
                        <v-btn icon="mdi-pencil" color="green" variant="text" @click="$emit('request-update', row)" />
                    </td>
                </tr>
    </tbody>
        </v-table>
        <div class="pagination">
            <slot name="pagination"></slot>
        </div>
    </div>
</template>

<style scoped>
table {
  border-collapse:collapse;
  margin: auto;
  width: 100%;
  max-width: 1200px;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  min-width: 700px;
  border-radius: 8px;
  overflow: hidden;
}

th {
  background-color: #42b883;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  padding: 15px;
}
.table-view{
    flex:2;
    margin-left: 20px;
    min-width: 600px;
}
.empty-view{
    flex:2;
    margin-left: 20px;
    min-width: 600px;
}

td {
  padding: 10px ;
  border-bottom: 1px solid #eee;
  align-items: center;
  word-break: break-all;
  max-width: 700px;
  color: #333;
}
</style>