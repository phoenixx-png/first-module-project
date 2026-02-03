<script>
import employeeInfo from '@/stores/employee_info.json';

export default {
    name: 'Employees',
    data() {
        return {
            employees: [],
            searchText: '',
            isLoading: true
        };
    },
    computed: {
        filteredEmployees() {
            if (!this.searchText) {
                return this.employees;
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
    },
    mounted() {
        this.employees = employeeInfo.employeeInformation || employeeInfo;
        this.isLoading = false;
        // this.$store.dispatch(variable)
    }
}

</script>

<template>
    <div class="page">
        <h1> Employees </h1>
        <div class="search">
            <input type="text" v-model="searchText" placeholder="Search Employees..." class="search-input">
        </div>

        <div class="employee-cards">
            <div v-for="employee in filteredEmployees" :key="employee.employeeId" class="employee-card">
                <div class="card-header">
                    <h3> {{ employee.name }}</h3>
                    <span class="card-id"> ID: {{ employee.employeeId }}</span>
                </div>
                <div class="card-content">
                    <p> <b> Position: </b> {{ employee.position }} </p>
                    <p> <b> Department: </b> {{ employee.department }} </p>
                    <p> <b> Contact: </b> {{ employee.contact }} </p>
                    <p> <b> History: </b> {{ employee.employmentHistory }}</p>
                    <p> <b> Salary: </b> {{ employee.salary }} </p>
                </div>
            </div>
            <div v-if="filteredEmployees.length === 0" class="no-results">
                No employees found. Please try a different search.
            </div>
            <div v-if="employees.length === 0" class="loading">
                Loading employees...
            </div>
        </div>
    </div>

</template>

<style>
.page{
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    min-height: calc(100vh - 120px);
}

.employee-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    margin-top: 20px;
}

.employee-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
}

.employee-card:hover{
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: #c7d2fe;
}

.dark-mode .employee-card {
    background: rgb(41, 41, 41);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e2e8f0;
}

.card-header h3{
    margin: 0;
    font-size: 1.25rem;
    color: #1e293b;
    line-height: 1.4;
}

.dark-mode .card-header h3{
    margin: 0;
    font-size: 1.25rem;
    color: #d8d8d8;
    line-height: 1.4;
}

.card-id {
    color: #64748b;
    font-size: 0.9rem;
    padding: 4px 8px;
    border-radius: 4px;
    background: #f1f5f9;
    font-weight: 500;
}

.dark-mode .card-id {
    color: #e0e1e3;
    font-size: 0.9rem;
    padding: 4px 8px;
    border-radius: 4px;
    background: #3f3f3f;
    font-weight: 500;
}

.card-content p{
    margin: 12px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
}

.card-content p:nth-child(odd) {
    background: #fff0d5;
    padding: 8px 12px;
    border-radius: 6px;
}

.dark-mode .card-content p:nth-child(odd) {
    background: #35374a;
    padding: 8px 12px;
    border-radius: 6px;
}

.no-results {
    grid-column: 1/-1 ;
    text-align: center;
    padding: 60px 20px;
    color: #64748b;
    background: #f8fafc;
    border-radius: 12px;
    border: 2px dashed #cbd5e1;
}

@media (max-width: 1200px) and (min-width: 768px) {
    .page {
        padding: 24px;
    }
    
    .employee-cards {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
    
    .employee-card {
        padding: 20px;
    }
    
    .search-input {
        padding: 12px 18px;
        font-size: 15px;
    }
}
</style>