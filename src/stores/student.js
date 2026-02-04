import { defineStore } from 'pinia'
import { ref, computed,reactive } from 'vue'

export const useStudentStore = defineStore('student', () => {
    const studentList = reactive([
        { reg_no: "24MCA0056", name: "Charan M", gender: "Male", dob: "2003-09-09", phone: "9876544210", email: "charan@gmail.com", course: "MCA" },
        { reg_no: "24MCA0055", name: "Sanjay M", gender: "Male", dob: "2003-09-09", phone: "9876544211", email: "sanjay@gmail.com", course: "MSC" },
        { reg_no: "24MCA0054", name: "Rajesh M", gender: "Male", dob: "2003-09-09", phone: "9876544210", email: "rajesh@gmail.com", course: "MCA" },
    ])
     const search = ref('')
     const Sort = ref('name')

    const addStudent = (student) => {
        studentList.push({ ...student })
        console.log(studentList)
    }

    const filteredList = computed(() => {
        let list = [...studentList]
        if (search.value) {
            const q = search.value.toLowerCase()
            list = list.filter(s => 
                s.name.toLowerCase().includes(q)
            )
        }
        list.sort((a, b) => {
            let valA = a[Sort.value] ? a[Sort.value].toString().toLowerCase() : ''
            let valB = b[Sort.value] ? b[Sort.value].toString().toLowerCase() : ''
            
            if (valA < valB) return -1
            if (valA > valB) return 1
            return 0
        })

        return list
    })

    return {
        studentList,
         search,
         Sort, 
        addStudent,
        filteredList,
    }
})