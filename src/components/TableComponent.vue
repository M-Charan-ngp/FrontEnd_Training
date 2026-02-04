<script setup>
import FilterHeader from './FilterHeader.vue';

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
</script>

<template>
    <div class="table-view" v-if="data.length > 0">
        <table>
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header">
                        {{ header.toUpperCase() }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in data" :key="index">
                    <td v-for="(,key) in row">
                        {{ row[key] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else class="empty-view">
        <h1>No Data Found...</h1>
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