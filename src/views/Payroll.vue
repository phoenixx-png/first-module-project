<script>
import { ref, computed, onMounted } from 'vue'
import employeesData from '@/stores/employee_info.json'
import payslipsData from '@/stores/payroll_data.json'

export default {
    name: 'PayrollView',
    setup() {
        const search = ref("")
        const selectedEmployee = ref(null)
        const employees = ref([])
        const payslips = ref([])

        const filteredEmployees = computed(() => {
            
            if (!search.value) return employees.value
            
            return employees.value.filter(emp =>
                emp.name.toLowerCase().includes(search.value.toLowerCase())
            )
        })

        function selectEmployee(emp) {
            console.log(payslips.value.payrollData);
            console.log(emp);
            
            const employeePayslips = payslips.value.filter(p => p.employeeId === emp.employeeId)
            selectedEmployee.value = {
                ...emp,
                payslips: employeePayslips
            }
            search.value = ""
        }

        function clearSelection(){
            selectedEmployee.value = null
            search.value = ""
        }

        onMounted(() => {
            employees.value = Array.isArray(employeesData) ? employeesData:
                              employeesData.employeeInformation || employeesData.employees || []
            payslips.value = Array.isArray(payslipsData) ? payslipsData:
                             payslipsData.payrollData || payslipsData.payslips || []
            
            console.log('Employees loaded:', employees.value.length)
            console.log('Payslips loaded:', payslips.value.length)
        })
        return {
            search,
            selectedEmployee,
            filteredEmployees,
            selectEmployee,
            clearSelection
        }
    }
}
</script>

<template>
    <div class="payroll-container">
        <h1 class="page-title">Payroll Management</h1>
        
        <div class="search-container">
            <input 
                v-model="search" 
                class="search-input" 
                placeholder="Search employees by name..."
                :disabled="selectedEmployee !== null"
            >
        </div>

        <!-- <div v-if="filteredEmployees.length > 0 && !selectedEmployee" class="employee-list-container"> -->
        <div v-if="true" class="employee-list-container">
            <h3>Search Results:</h3>
            <ul class="employee-list">
                <li v-for="emp in filteredEmployees" :key="emp.employeeId" class="emp-item" @click="selectEmployee(emp)">
                    <div class="emp-info">
                        <span class="emp-name">{{ emp.name }}</span>
                        <span class="emp-position">{{ emp.position }}</span>
                    </div>
                    <span class="emp-arrow">→</span>
                </li>
            </ul>
        </div>

        <div v-if="search && filteredEmployees.length === 0 && !selectedEmployee" class="no-results">
            No employees found for "{{ search }}"
        </div>

        <div v-if="selectedEmployee" class="employee-card">
            <div class="employee-card-header">
                <button @click="clearSelection" class="back-btn">← Back to search</button>
            </div>
            
            <div class="employee-header">
                <h2>{{ selectedEmployee.name }}</h2>
                <p class="employee-position">{{ selectedEmployee.position }}</p>
                <p class="employee-id">ID: {{ selectedEmployee.employeeId }}</p>
            </div>

            <h3 class="payslips-title">Payslips ({{ selectedEmployee.payslips.length }})</h3>
            
            <div v-if="selectedEmployee.payslips.length > 0" class="payslips-grid">
                <div v-for="slip in selectedEmployee.payslips" :key="slip.month + slip.employeeId" class="payslip-card">
                    <div class="payslip-header">
                        <strong class="month">{{ slip.month }}</strong>
                        <span class="salary">R{{ (slip.finalSalary).toLocaleString() }}</span>
                    </div>
                    <div class="payslip-details">
                        <div class="detail-row">
                            <span>Hours Worked:</span>
                            <span class="value">{{ slip.hoursWorked }}</span>
                        </div>
                        <div class="detail-row">
                            <span>Leave Deductions:</span>
                            <span class="value deduction">R{{ slip.leaveDeductions.toLocaleString() }}</span>
                        </div>
                        <div class="detail-row total">
                            <span>Net Salary:</span>
                            <span class="value total-salary">R{{ slip.finalSalary.toLocaleString() }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="no-payslips">
                <p>No payslips found for this employee</p>
            </div>
        </div>

        <div v-if="!selectedEmployee && !search" class="instruction">
            <p>Type in the search box above to find employees and view their payslips</p>
        </div>
    </div>
</template>


<style>
.payroll-container{
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    min-height: calc(100vh - 120px);
}

.employee-list{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
    margin-top: 20px;
    list-style: none;
    padding: 0;
}

.emp-item{
    background: white;
    border-radius: 10px;
    border: 1px solid black;
    padding: 20px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.emp-name{
    font-weight: 600;
    font-size: 1.1rem;
}

.emp-position{
    font-size: 0.9rem;
    padding: 4px 10px;
    border-radius: 6px;
    font-weight: 500;
}

.employee-card{
    background: white;
    border-radius: 16px;
    padding: 32px;
    border: 1px solid black;
    margin-top: 24px;
    animation: fadeIn 0.3s ease;
}

.employee-header{
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid black;
}

.employee-header h2{
    margin: 0 0 8px 0;
    font-size: 1.8rem;
}

.employee-position{
    font-weight: 600;
    font-size: 1.1rem;
    margin: 0;
}

.payslips-title{
    margin: 0 0 24px 0;
    font-size: 1.5rem;
}

.payslips-grid{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.payslip-card{
    background: white;
    border-radius: 12px;
    padding: 24px;
    border: 1px black;
}

.payslip-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid black;
}

.month{
    font-size: 1.2rem;
    font-weight: 600;
}

.salary{
    font-weight: 700;
    font-size: 1.3rem;
    padding: 6px 12px;
    border-radius: 6px;
}
</style>
