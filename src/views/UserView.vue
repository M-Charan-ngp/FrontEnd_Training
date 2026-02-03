<script setup>
import { ref } from 'vue' 
const user_list = {
    '24MCA0010': 'Charan',
    '24MBA0011': 'Sanjay',
    '24MCA0001': 'Amal',
    '24MSC0023': 'Rajesh',
}

const detailed_user_list = [
  {
    'Reg_no':'24MCA0010', 
    'Name': 'Charan',
    'Course': 'MCA',
    'College': 'CEG',
    'City': 'Vellore'
  },
  {
    'Reg_no':'24MBA0011', 
    'Name': 'Sanjay',
    'Course': 'MBA',
    'College': 'GOV',
    'City': 'Vellore'
  },
  {
    'Reg_no':'24MCA0001', 
    'Name': 'Amal',
    'Course': 'MCA',
    'College': 'CEG',
    'City': 'Wayanad'
  },
  {
    'Reg_no':'24MSC018', 
    'Name': 'Rajesh',
    'Course': 'MSC',
    'College': 'CEG',
    'City': 'Tirunelveli'
  },
]
const visible = ref(false)

const show_data = () => {
    visible.value = true
}

const hide_data = () => {
    visible.value = false
}
</script>

<template>
  <main>
    <h1 >User Directory</h1>
    
    <button @click="hide_data" :disabled="!visible">Hide Detailed Table</button>
    <button @click="show_data" :disabled="visible">Show Detailed Table</button>

    <div v-if="visible">
      <table>
          <thead>
              <tr>
                  <th>Register Number</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>College</th>
                  <th>City</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="values in detailed_user_list">
                <td>{{ values.Reg_no }}</td>
                <td>{{ values.Name }}</td>
                <td>{{ values.College }}</td>
                <td>{{ values.City }}</td>
              </tr>
          </tbody>
      </table>
    </div>
    <div v-else text-align>
        <table>
          <thead>
              <tr>
                  <th>Register Number</th>
                  <th>Name</th>

              </tr>
          </thead>
          <tbody>
              <tr v-for="(value, key) in user_list">
                  <td>{{ key }}</td>
                  <td>{{ value }}</td>
              </tr>
          </tbody>
      </table>
    </div>
  </main>
</template>

<style scoped>

main {
  align-items: center;
  text-align: center;
  place-items: center;  
  width: 100%;
}
table {
  border-collapse:collapse;
  margin: auto;
  width: 90%;
  max-width: 1000px;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
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

td {
  padding: 10px ;
  border-bottom: 1px solid #eee;
  color: #333;
}
button {
  background-color: #42b883; 
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
button:disabled{
  background-color: #274939;
}
button:not(:disabled):hover {
  background-color: #33a06f;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}


</style>