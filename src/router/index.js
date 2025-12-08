import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Employees from "../views/Employees.vue";
import Attendance from "../views/Attendance.vue";
import Payroll from "../views/Payroll.vue";
import Performance from "../views/Performance.vue";
import TimeOff from "../views/TimeOff.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/employees",
    name: "Employees",
    component: Employees,
    meta: { requiresAuth: true }
  },
  {
    path: "/attendance",
    name: "Attendance",
    component: Attendance,
    meta: { requiresAuth: true }
  },
  {
    path: "/payroll",
    name: "Payroll",
    component: Payroll,
    meta: { requiresAuth: true }
  },
  {
    path: "/performance",
    name: "Performance",
    component: Performance,
    meta: { requiresAuth: true }
  },
  {
    path: "/timeoff",
    name: "TimeOff",
    component: TimeOff,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isLoggedIn = localStorage.getItem('savedEmail') !== null;
  
  if (requiresAuth && !isLoggedIn) {
    next('/');
  } else if (to.path === '/' && isLoggedIn) {
    next('/employees');
  } else {
    next();
  }
});

export default router;
