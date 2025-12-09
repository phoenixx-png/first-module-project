<script>
export default {
    name: 'PerformancePage',
}
</script>


<template>
    <div class="performance-page">
        <div class="page-header">
            <div>
                <h1>Performance Reviews</h1>
            </div>
        </div>

        <div class="controls">
            <div class="search">
                <i class="bi bi-search"></i>
                <input type="text" v-model="searchText" placeholder="Search employees...">
            </div>

            <div class="sort">
                <span>Sort by:</span>
                <select v-model="sortBy" @change="changeSort(sortBy)">
                    <option value="rating">Rating</option>
                    <option value="name">Name</option>
                    <option value="department">Department</option>
                    <option value="productivity">Productivity</option>
                </select>
                <button @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'">
                    <i :class="sortOrder === 'asc' ? 'bi bi-sort-up' : 'bi bi-sort-down'"></i>
                </button>
            </div>
        </div>

        <div class="cards-grid">
            <div v-for="emp in filteredEmployees" :key="emp.employeeId" class="card">
                <div class="card-header">
                    <div class="employee">
                        <div class="avatar">{{ emp.name.charAt(0) }}</div>
                        <div>
                            <h3>{{ emp.name }}</h3>
                            <p>{{ emp.position }}</p>
                            <small>{{ emp.department }} Department</small>
                        </div>
                    </div>
                    <div class="rating" :style="{ color: getRatingColor(emp.rating) }">
                        {{ emp.rating.toFixed(1) }}
                        <i class="bi bi-star-fill"></i>
                    </div>
                </div>

                <div class="metrics">
                    <div class="metric">
                        <span>Productivity</span>
                        <div class="bar">
                            <div class="fill" :style="{ width: emp.productivity + '%' }"></div>
                        </div>
                        <span>{{ emp.productivity }}%</span>
                    </div>

                    <div class="metric">
                        <span>Quality</span>
                        <div class="bar">
                            <div class="fill" :style="{ width: emp.quality + '%' }"></div>
                        </div>
                        <span>{{ emp.quality }}%</span>
                    </div>

                    <div class="metric">
                        <span>Attendance</span>
                        <div class="bar">
                            <div class="fill" :style="{ width: emp.attendance + '%' }"></div>
                        </div>
                        <span>{{ emp.attendance }}%</span>
                    </div>
                </div>

                <div class="goals">
                    <h4>Current Goals</h4>
                    <div v-for="(goal, idx) in emp.goals" :key="idx" class="goal">
                        <div class="goal-header">
                            <span>{{ goal.title }}</span>
                            <span>{{ goal.progress }}%</span>
                        </div>
                        <div class="bar">
                            <div class="fill" :style="{
                                width: goal.progress + '%',
                                'background-color': getProgressColor(goal.progress)
                            }"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="filteredEmployees.length === 0" class="no-results">
            <i class="bi bi-search"></i>
            <h3>No employees found</h3>
            <p>Try a different search result</p>
        </div>

    </div>

</template>


<style>

</style>