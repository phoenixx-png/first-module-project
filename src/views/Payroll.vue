<script>
import { ref, computed } from 'vue'
import employees from '@/stores/employee_info.json'
import payslips from '@/stores/payroll_data.json'

const search = ref("")
const selectedEmployee = ref(null)
const selectedEmp = ref(null)
const filteredEmployees = computed(() =>
    employees.filter(emp =>
        emp.name.toLowerCase().includes(search.value.toLowerCase())
    )
)

function selectedEmployeefx(emp) {
    function selectEmployee(emp) {
        const employeePayslips = payslips.filter(p => p.employeeId === emp.employeeId)
        selectedEmployee.value = { ...emp, payslips: employeePayslips }
        search.value = ""
    }
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


<style>
    .payroll-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.search-section {
    margin-bottom: 2rem;
}

.search-input {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.search-input:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.search-input::placeholder {
    color: #94a3b8;
}

.employee-list {
    list-style: none;
    padding: 0;
    margin: 0;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    max-height: 400px;
    overflow-y: auto;
}

.emp-item {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #f1f5f9;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s ease;
}

.emp-item:hover {
    background-color: #f8fafc;
    transform: translateX(4px);
}

.emp-item:last-child {
    border-bottom: none;
}

.emp-name {
    font-weight: 600;
    color: #1e293b;
    font-size: 1.1rem;
}

.emp-position {
    color: #64748b;
    font-size: 0.9rem;
    background: #f1f5f9;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
}

.no-results {
    text-align: center;
    color: #64748b;
    padding: 2rem;
    background: #f8fafc;
    border-radius: 10px;
    margin: 1rem 0;
}

.employee-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.employee-header {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #f1f5f9;
}

.employee-header h2 {
    margin: 0 0 0.5rem 0;
    color: #1e293b;
    font-size: 1.8rem;
}

.employee-position {
    color: #4f46e5;
    font-weight: 500;
    margin-bottom: 1.5rem;
}

.back-btn {
    background: none;
    border: 1px solid #e2e8f0;
    color: #64748b;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
}

.back-btn:hover {
    background: #f8fafc;
    color: #4f46e5;
    border-color: #c7d2fe;
}

.payslips-title {
    color: #1e293b;
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
}

.payslips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
}

.payslip-card {
    background: #f8fafc;
    border-radius: 10px;
    padding: 1.5rem;
    border: 1px solid #e2e8f0;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.payslip-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.payslip-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #e2e8f0;
}

.month {
    color: #1e293b;
    font-size: 1.1rem;
}

.salary {
    color: #10b981;
    font-weight: 700;
    font-size: 1.2rem;
}

.payslip-details {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.detail-row span:first-child {
    color: #64748b;
    font-size: 0.9rem;
}

.detail-row .value {
    color: #1e293b;
    font-weight: 500;
}

.no-payslips {
    text-align: center;
    color: #64748b;
    padding: 2rem;
    background: #f8fafc;
    border-radius: 10px;
}

@media (max-width: 768px) {
    .payroll-container {
        padding: 1rem;
    }
    
    .payslips-grid {
        grid-template-columns: 1fr;
    }
    
    .emp-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
}
</style>
