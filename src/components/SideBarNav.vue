<script>
export default {
  name: 'SideBarNav',
  props: {
    isCollapsed: Boolean
  },
  data() {
    return {
      menuItems: [
        { title: 'Dashboard', path: '/dashboard', icon: 'bi-house' },
        { title: 'Employees', path: '/employees', icon: 'bi-people' },
        { title: 'Attendance', path: '/attendance', icon: 'bi-calendar-check' },
        { title: 'Payroll', path: '/payroll', icon: 'bi-cash-stack' },
        { title: 'Performance', path: '/performance', icon: 'bi-graph-up' },
        { title: 'Time Off', path: '/timeoff', icon: 'bi-clock-history' },
        { title: 'Settings', path: '/settings', icon: 'bi-gear' }
      ]
    }
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    isItemActive(item) {
      return this.$route.path === item.path;
    }
  }
}
</script>

<template>
  <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
    <div class="sidebar-header">
      <div class="sidebar-logo" @click="$router.push('/dashboard')" v-if="!isCollapsed">
        <i class="bi bi-people"></i>
        <span>HR System</span>
      </div>
      <div class="sidebar-logo" @click="$router.push('/dashboard')" v-else>
        <i class="bi bi-people"></i>
      </div>
    </div>

    <nav class="sidebar-nav">
      <ul class="nav-menu">
        <li v-for="item in menuItems" 
            :key="item.path" 
            class="nav-item"
            :class="{ 'active': isItemActive(item) }"
            @click="navigateTo(item.path)">
          
          <div class="nav-link">
            <i :class="'bi' + item.icon"></i>
            <span v-if="!isCollapsed" class="nav-text">{{ item.title }}</span>
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style>


</style>