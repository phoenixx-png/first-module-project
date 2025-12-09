<script>
export default {
    name: 'Dashboard',
    data() {
        return {
            totalEmployees: 45,
            presentToday: 42,
            pendingApprovals: 8,
            
        }
    },
}

</script>


<template>
    <div class="dashboard-page">
        <div class="page-header">
            <h1> Overview </h1>
            <div class="date-range">
                <span> Last 30 days </span>
                <i class="bi bi-calendar"> </i>
            </div>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon" style="background: #e3f2fd;">
                    <i class="bi bi-people" style="color: #2196f3;"></i>
                </div>
                <div class="stat-content">
                    <h3> {{ totalEmployees }}</h3>
                    <p> Total Employees</p>
                    <span class="trend positive"> +5% in the last month </span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background: #e8f5e9;">
                    <i class="bi bi-calendar-check" style="color: #4caf50;"></i>
                </div>
                <div class="stat-content">
                    <h3> {{ presentToday }}</h3>
                    <span class="trend"> 89% attendance rate</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background: #fff3e0;">
                    <i class="bi bi-clock-history" style="color: #ff9800;"></i>
                </div>
                <div class="stat-content">
                    <h3>{{ pendingApprovals }}</h3>
                    <p>Pending Requests</p>
                    <span class="trend negative">+3 from yesterday</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background: #f3e5f5;">
                    <i class="bi bi-cash-stack" style="color: #9c27b0;"></i>
                </div>
                <div class="stat-content">
                    <h3> R{{ totalPayroll.toLocaleString() }}</h3>
                    <p> Monthly Payroll </p>
                    <span class="trend"> Due in 5 days </span>
                </div>
            </div>
        </div>
        <div class="dashboard-content">
            <div class="chart-section">
                <h3> Attendance trend </h3>
                <div class="placeholder">
                    <p> Attendance Chart </p>
                </div>
            </div>
            <div class="recent-activity">
                <h3> Recent Activity </h3>
                <div class="activity-list">
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="bi bi-person-plus"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style></style>