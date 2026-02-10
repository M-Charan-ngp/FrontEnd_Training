import { defineStore } from 'pinia'
import { ref, computed,reactive } from 'vue'

export const useStudentStore = defineStore('student', () => {
    const studentList = reactive([
        { id:1, reg_no: "24MCA0051", name: "Charan M", gender: "Male", dob: "2003-09-09", phone: "9876544210", email: "charan@gmail.com", course: "MCA" },
        { id:2, reg_no: "24MCA0052", name: "Sanjay M", gender: "Male", dob: "2003-09-09", phone: "9876544211", email: "sanjay@gmail.com", course: "MSC" },
        { id:3, reg_no: "24MCA0053", name: "Rajesh M", gender: "Male", dob: "2003-09-09", phone: "9876544210", email: "rajesh@gmail.com", course: "MCA" },
        { id:4, reg_no: "24MCA0054", name: "Amal M", gender: "Male", dob: "2003-09-09", phone: "9876544210", email: "charan@gmail.com", course: "MCA" },
        { id:5, reg_no: "24MCA0055", name: "Gokul M", gender: "Male", dob: "2003-09-09", phone: "9876544211", email: "sanjay@gmail.com", course: "MSC" },
        { id:6, reg_no: "24MCA0056", name: "jackie chan", gender: "Male", dob: "2003-09-09", phone: "9876544210", email: "rajesh@gmail.com", course: "MCA" },
        { id:7, reg_no: "24MCA0057", name: "Velan M", gender: "Male", dob: "2003-09-09", phone: "9876544210", email: "charan@gmail.com", course: "MCA" },
        { id:8, reg_no: "24MCA0058", name: "Ram M", gender: "Male", dob: "2003-09-09", phone: "9876544211", email: "sanjay@gmail.com", course: "MSC" },
        { id:9, reg_no: "24MCA0059", name: "Sam M", gender: "Male", dob: "2003-09-09", phone: "9876544210", email: "rajesh@gmail.com", course: "MCA" },
        { id:10, reg_no: "24MCA0060", name: "Ganesh M", gender: "Male", dob: "2003-09-09", phone: "9876544210", email: "charan@gmail.com", course: "MCA" },
    ])
    const page = ref(0)
    const limit = ref(5)
     const search = ref('')
     const Sort = ref('reg_no')
    const addStudent = (student) => {
        const nextId = studentList.length > 0 
            ? Math.max(...studentList.map(s => s.id)) + 1 
            : 1
            
        studentList.push({ id: nextId,...student })
    }

    const updateStudent = (updatedStudent) => {
        const index = studentList.findIndex(s => s.id === updatedStudent.id)
        if (index !== -1) {
            studentList[index] = { ...updatedStudent }
        }
    }
    const removeStudent = (studentId) => {
        const index = studentList.findIndex(student => student.id === studentId);
        if (index !== -1) {
            studentList.splice(index, 1);
        }
    };

    const totalPages = computed(() => {
        const totalStudents = filteredList.value.length; 
        const size = limit.value;
        const pages = Math.ceil(totalStudents / size);
        return pages > 0 ? pages : 1;
    })

    const filteredList = computed(() => {
        page.value = 0
        let list = [...studentList]
        if (search.value) {
            const q = search.value.toLowerCase()
            list = list.filter(s => 
                s.name.toLowerCase().includes(q)||
                s.reg_no.toLowerCase().includes(q)
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

    const paginatedList = computed(() => {
    const start = page.value * limit.value;
    const end = start + limit.value;
    return filteredList.value.slice(start, end);
});

    return {
        studentList,
        updateStudent,
        removeStudent,
        search,
        Sort, 
        addStudent,
        page,
        totalPages,
        paginatedList,
        filteredList,
    }
})