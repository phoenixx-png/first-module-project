<script>
import employeesData from '../stores/employee_info.json';
export default {
    name: 'Employees',
    data() {
        return {
            employees: employeesData.employeeInformation,
            searchText: '',
        };
    },
    computed: {
        filteredEmployees() {
            if (!this.searchText) {
                return this.employees
            }
            const search = this.searchText.toLowerCase()
            return this.employees.filter(employee => {
                return (
                    employee.name.toLowerCase().includes(search) ||
                    employee.position.toLowerCase().includes(search) ||
                    employee.department.toLowerCase().includes(search)
                )
            })
        }
    }
}
</script>

<template>

    <div class="page">
        <h1> Employees </h1>
        <div class="search"> <input type="text" v-model="searchText" placeholder="Search Employees..."
                class="search-input">
        </div>
        <div class="employee-cards">
            <div class="card-header">
                <h3> {{ employee.name }}</h3>
                <span class="card-id"> ID: {{ employee.employeeId }}</span>
            </div>

            <div class="card-content">
                <p> Position: {{ employee.position }} </p>
                <p> Department: {{ employee.department }} </p>
                <p> Contact: {{ employee.contact }} </p>
                <p> History: {{ employee.employeeHistory }}</p>
                <p> Salary: {{ employee.salary }} </p>
            </div>

            <div v-if="filteredEmployees.length === 0" class="no-results">
                No employees found. Please try a different search.
            </div>
        </div>
    </div>

</template>

<style>

</style>