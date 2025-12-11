<template>
    <div class="sttendance-container">
        <h1 class="page-title">Attendance Tracking</h1>

        <div class="filter-section">
            <div class="filter-group">
                <label for="month-filter">Select Month :</label>
                <input type="month" id="month-filter" v-model="selectedMonth" @change="filterByMonth"/>
            </div>

            <div class="filter-group">
                <label for="status-filter">Fiter by Status</label>
                <select id="status-filter" v-model="selectedStatus" @change="filterByStatus">
                    <option value="all">All Status</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                    <option value="On Leave">On Leave</option>
                </select>
            </div>

            <button @click="resetFilters" class="reset-btn">Reset Filters</button>
        </div>

        <div class="stats-section">
            <h3>Monthly Overview({{ currentMonthName }})</h3>
            <div class="stat-card">
                <div class="stat-icon present">📊</div>
                <div class="stat-info">
                    <h4>Total Employees</h4>
                    <p class="stat-value">{{ totalEmployees }}</p>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon present">✅</div>
                <div class="stat-info">
                    <h4>Average Attendance</h4>
                    <p class="stat-value">{{ averageAttendance }}%</p>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon absent">⚠️</div>
                <div class="stat-info">
                    <h4>Absences</h4>
                    <p class="stat-value">{{ totalAbseneces }}</p>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon leave">🏖️</div>
                <div class="stat-info">
                    <h4>On Leave</h4>
                    <p class="stat-value">{{ totalOnLeave }}</p>
                </div>
            </div>
        </div>
    </div>

    <div class="calendar-section">
        <h3>Attendance Calendar - {{ currentMonthName }}</h3>
        <div class="calendar-controls">
            <button @click="prevMonth" class="nav-btn">Previous ← </button>
            <span class="current-month">{{ currentMonthName }} {{ currentYear }}</span>
            <button @click="nextMonth" class="nav-btn">Next → </button>
        </div>

        <div class="calendar-grid">
            <div class="calendar-header" v-for="day in ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']" :key="day">
                {{ day }}
            </div>

            <div v-for="day in calendarDays" :key="day.date" class="calendar-day" :class="{'empty-day' : !day.inMonth}">
                <div class="day-number">{{ day.day }}</div>
                <div v-if="day.inMonth" class="day-attendance">
                    <div v-for="record in getAttendanceForDate(day.date)" :key="record.employeeId" class="employee-dot" :class="getStatusClass(record.status)" :title="`${record.name}: ${record.status}`">
                    </div>
                </div>
            </div>
        </div>

        <div class="calendar-legend">
            <div class="lengend-item">
                <span class="legend-dot present"></span>Present
            </div>
            <div class="lengend-item">
                <span class="legend-dot absent"></span>Absent
            </div>
            <div class="lengend-item">
                <span class="legend-dot late"></span>Late
            </div>
            <div class="lengend-item">
                <span class="legend-dot leave"></span>On Leave
            </div>
        </div>
    </div>

    <div class="table-section">
        <h3>Detailed Attendance Records</h3>
        <div class="table-container">
            <table class="attendance-table">
                <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Employee ID</th>
                      <th v-for="date in displayedDates" :key="date">{{ formatDate(date) }}</th>
                      <th>Present Days</th>
                      <th>Attendance %</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="employee in filteredAttendance" :key="employee.employeeId">
                        <td class="employee-name">
                            <strong>{{ employee.name }}</strong>
                        </td>

                        <td v-for="date in displayedDates" :key="date" class="attendance-cell">
                            <span class="status-badge" :class="getStatusClass(getEmployeeStatus(employee, date))">
                                {{ getStatusInitial(getEmployeeStatus(employee, date)) }}
                            </span>
                        </td>

                        <td class="stat-cell">
                            <div class="attendance-percentage">
                                <div class="percentage-bar">
                                    <div class="percentage-fill" :style="{width: calculateAttendancePercentage(employee) + '%'}">
                                    </div>
                                </div>
                                <span>{{ calculateAttendancePercentage(employee) }}%</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import{ref, computed, onMounted} from 'vue'
    import attendanceData from '@/stores/attendance.json'

    export default {
        name: 'AttendanceView',
        setup(){
            const attendanceRecords = ref([])
            const selectedMonth = ref(new Date().toISOString().slice(0,7))

            const selectedStatus = ref('all')
            const currentDate = ref(new Date())

            onMounted(() => {
                attendanceRecords.value = attendanceData.attendanceAndLeave || []
                console.log('Attendance data loaded:', attendanceRecords.value.length, employees)
            })

            const filteredAttendance = computed(() => {
                const[year,month] = selectedMonth.value.split('-').map(Number)

                return attendanceRecords.value.map(employee => {
                    const filteredAttendance = employee.attendance.filter(record=> {
                        const recordDate = new Date(record.date)
                        return recordDate.getFullYear() === year &&
                               recordDate.getMonth() +1 === month
                    }) 

                    return {
                        ...employee, 
                        attendance: filteredAttendance
                    }
                })
            })

            const totalemployees = computed(() => attendanceRecords.value.length)

            const averageAttendance = computed(() => {
                if (filteredAttendance.value.length === 0) return 0

                const totalDays= filteredAttendance.value.reduce((sum,emp) =>{
                    return sum + emp.attendance.length
                },0)

                const presentDays = filteredAttendance.value.reduce((sum, emp) => {
                    const present = emp.attendance.filter(a => a.status === 'Present').length

                    return sum + present
                },0)

                return totalDays > 0? Math.round((presentDays / totalDays) * 100) : 0
            })

            const totalAbseneces =computed(()=> {
                return filteredAttendance.value.reduce((sum, emp)=> {
                    return sum + emp.attendance.filter(a => a.status === 'Absent').length
                },0)
            })

            const totalOnLeave = computed(() => {
                return filteredAttendance.value.reduce((sum,emp)=>{
                    return sum + emp.attendance.filter(a => a.status === 'On Leave').length
                },0)
            })

            const currentMonthName = computed(() => {
                return new Date(selectedMonth.value + '-01').toLocaleDateString('en-US', {month: 'long', year: 'numeric'    
                })  
            })
            const currentYear = computed(() => {
                return new Date(selectedMonth.value + '-01').getFullYear()
            })

            const displayedDates = computed(()=> {
                const [year, month] = selectedMonth.value.split('-').map(number)
                const daysInMonth = new Date(year, month, 0).getDate()
                const dates = []

                for (let day = 1; day <= daysInMonth; day++){
                    dates.push(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`)
                }

                return dates.slice(0,10)
            })

            const calendardays = computed(() => {
                const [year,month] = selectedMonth.value.split('-').map(Number)
                const firstDay = new Date(year, month - 1, 1)
                const lastDay = new Date(year, month, 0)
                const daysInMonth = lastDay.getDate()

                const days = []

                const startDay = firstDay.getDay() === 0 ? 6 : firstDay() -1
                for (let i = 0; i < startDay; i++){
                    days.push({day: '', date: '', inMonth: false})
                }

                for (let day = 1; day <= daysInMonth; day++){
                    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
                    days.push({day, date, inMonth: true})
                }

                return days
            })
            function getEmployeeStatus(employee,date){
                const record = employee.attendance.find(a => a.date === date)
                return record ? record.status : 'Not recorded'
            }

            function calculatePresentDays(employee){
                return employee.attendance.filter(a => a.status === 'Present').length
            }

            function calculateAttendancePercentage(employee){
                const totalDays = employee.attendance.length
                const presentDays = employee.attendance.filter(a => a.satus === 'Present').length
                return totaldays > 0 ? Math.round((presentDays / totalDays)* 100) : 0
            }

            function getAttendanceForDate(date){
                const records = []
                filteredAttendance.value.forEach(employee => {
                    const attendance = employee.attendance.find(a => a.date === date)
                    if (attendance){
                        records.push({
                            employeeId: employee.employeeId,
                            name: employee.name,
                            status: attendance.status
                        })
                    }
                })
                return records.slice(0.3)
            }
            function getStatusClass(status){
                const statusMap = {
                    'Present': 'present',
                    'Absent': 'absent',
                    'Late': 'late',
                    'On Leave': 'leave',
                    'Not recorded': 'not-recorded'
                }
                return statusMap[status] || 'not-recorded'
            }

            function getStatusInitial(status){
                const initialMap = {
                    'Present': 'P',
                    'Absent' : 'A',
                    'Late' : 'L',
                    'On Leave' : 'LV',
                    'Not Recorded': '-'
                }
                return initialMap[status] || '-'
            }
            function formatdate(dateString){
                
            }

    }
</script>

<style scoped>
.attendance-container{
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
    min-height: calc(100vh-12px);
}

.page-title{
    margin-bottom: 30px;
    color: #2c3e50;
    font-size: 2rem;
    text-align: center;
}

.filter-section{
    display: flex;
    gap: 20px;
    align-items: flex-end;
    margin-bottom: 30px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-group{
    flex: 1;
}
</style>