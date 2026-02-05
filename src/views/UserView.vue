<script setup>
import { ref } from 'vue' 
const user_list_header = ["Name","Reg No"]
const user_list = [
     { reg_no: "24MCA0056", name: "Charan M" },
    {reg:'24MBA0011', name:'Sanjay'},
    {reg:'24MCA0001',name:'Amal'},
    {reg:'24MSC0023',name:'Rajesh'},
]
const detailed_user_list_header = ["Reg No", "name","course","college","city"]
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
      <TableComponent
        :headers="detailed_user_list_header",
        :data="detailed_user_list"/>
      
    </div>
    <div v-else text-align>
        <TableComponent
        :headers="user_list_header",
        :data="user_list"/>
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