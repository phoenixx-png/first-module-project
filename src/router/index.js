import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import('../views/Login.vue')
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: "/employees",
    name: "Employees",
    component: () => import('../views/Employees.vue')
  },
  {
    path: "/attendance",
    name: "Attendance",
    component: () => import('../views/Attendance.vue')
  },
  {
    path: "/payroll",
    name: "Payroll",
    component: () => import('../views/Payroll.vue')
  },
  {
    path: "/performance",
    name: "Performance",
    component: () => import('../views/Performance.vue')
  },
  {
    path: "/timeoff",
    name: "TimeOff",
    component: () => import('../views/TimeOff.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('auth') === 'true'
  
  if (to.name === 'home' && !isAuthenticated) {
    next('/login')
  } 
  else if (to.name === 'login' && isAuthenticated) {
    next('/home')
  } 
  else {
    next()
  }
})

export default router
