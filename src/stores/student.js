import { defineStore } from 'pinia'
import { ref, computed,reactive } from 'vue'

export const useStudentStore = defineStore('student', () => {
    const studentList = reactive([
        { reg_no: "24MCA0060", name: "Charan M", gender: "Male", dob: "2003-09-09", phone: "9876544210", email: "charan@gmail.com", course: "MCA" },
        { reg_no: "24MCA0059", name: "Sanjay M", gender: "Male", dob: "2003-09-09", phone: "9876544211", email: "sanjay@gmail.com", course: "MSC" },
        { reg_no: "24MCA0058", name: "Rajesh M", gender: "Male", dob: "2003-09-09", phone: "9876544210", email: "rajesh@gmail.com", course: "MCA" },
        { reg_no: "24MCA0057", name: "Amal M", gender: "Male", dob: "2003-09-09", phone: "9876544210", email: "charan@gmail.com", course: "MCA" },
        { reg_no: "24MCA0056", name: "Gokul M", gender: "Male", dob: "2003-09-09", phone: "9876544211", email: "sanjay@gmail.com", course: "MSC" },
        { reg_no: "24MCA0055", name: "jackie chan", gender: "Male", dob: "2003-09-09", phone: "9876544210", email: "rajesh@gmail.com", course: "MCA" },
        { reg_no: "24MCA0054", name: "Velan M", gender: "Male", dob: "2003-09-09", phone: "9876544210", email: "charan@gmail.com", course: "MCA" },
        { reg_no: "24MCA0053", name: "Ram M", gender: "Male", dob: "2003-09-09", phone: "9876544211", email: "sanjay@gmail.com", course: "MSC" },
        { reg_no: "24MCA0052", name: "Sam M", gender: "Male", dob: "2003-09-09", phone: "9876544210", email: "rajesh@gmail.com", course: "MCA" },
        { reg_no: "24MCA0051", name: "Ganesh M", gender: "Male", dob: "2003-09-09", phone: "9876544210", email: "charan@gmail.com", course: "MCA" },
    ])
    const page = ref(0)
    const limit = ref(5)
     const search = ref('')
     const Sort = ref('name')
    const addStudent = (student) => {
        studentList.push({ ...student })
    }

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

    const paginatedList = computed(() => {
    const start = page.value * limit.value;
    const end = start + limit.value;
    console.log(`Slicing from ${start} to ${end}`); 
    return filteredList.value.slice(start, end);
});

    return {
        studentList,
        search,
        Sort, 
        addStudent,
        page,
        totalPages,
        paginatedList,
        filteredList,
    }
})