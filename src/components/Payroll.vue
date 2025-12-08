<script setup>
import {ref,computed} from 'vue'
import employees from '@/stores/employee_info.json'
import payslips from '@/stores/payroll_data.json'

const search = ref("")
const selectedEmployee = ref(null)
const filteredEmployees = computed(()=>
  employees.filter(emp =>
    emp.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

function selectedEmployee(emp){
    const employeePayslips = payslips.filter(p => p.employeeId === emp.employeeId)
    selectedEmployee.value = {...emp,payslips: employeePayslips}
    search.value = ""
}
</script>

<template>
    <input v-model="search" placeholder="Saerch by name" class="search-input">
    <ul v-if="filteredEmployees.length && !selectedEmployee">
        <li v-for="emp in filteredEmployees" :key="emp.employeeId" class="emp-item">
            {{ emp.name }}-{{ emp.position }}
        </li>
    </ul>

    <div v-if="selectedEmployee" class="employee-card">
        <h2>{{ selectedEmployee.name }}</h2>
        <h3>Payslips</h3>
        <div v-for="slip in selectedEmployee.payslips" :key="slip.month" class="payslip-card">
            <strong>{{ slip.month }}</strong>
            <p>Hours Worked: {{ slip.hoursWorked }}</p>
            <p>Leave Deductions:{{ slip.leaveDeductions }}</p>
            <p><b>Final Salary: R{{ slip.finalSalary }}</b></p>
        </div>
    </div>
</template>