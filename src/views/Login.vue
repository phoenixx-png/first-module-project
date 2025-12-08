<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      rememberMe: false,
      loading: false,
    }
  },
  methods: {
    handleLogin() {
      if (!this.email || !this.password) {
        alert('Please fill in all fields')
        return
      }
      this.loading = true

      setTimeout(() => {
        alert(`Login\nEmail: ${this.email}\nPassword: ${this.password}\nRemember me: ${this.rememberMe}`)
        if (this.rememberMe) {
          localStorage.setItem('savedEmail', this.email)
        }

        this.loading = false
      }, 500)
    }
  },
  mounted() {
    const savedEmail = localStorage.getItem('savedEmail')
    if (savedEmail) {
      this.email = savedEmail
      this.rememberMe = true
    }
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="left-panel">
        <div class="welcome-section">
          <div class="logo">
            <i class="bi bi-people"></i>
            <h1>HR</h1>
          </div>

          <div class="welcome-text">
            <h2>Welcome back!</h2>
          </div>

          <div class="features">
            <div class="feature">
              <i class="bi bi-people"></i>
              <span>Manage Employees</span>
            </div>
            <div class="feature">
              <i class="bi bi-cash-stack"></i>
              <span>Process Payroll</span>
            </div>
            <div class="feature">
              <i class="bi bi-calendar-check"></i>
              <span>Track Attendance</span>
            </div>
          </div>
        </div>
      </div>

      <div class="right-panel">
        <div class="login-card">
          <h3>Sign In</h3>

          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
              <label>Email Address</label>
              <div class="input-group">
                <i class="bi bi-envelope"></i>
                <input v-model="email" type="email" placeholder="you@company.com" required />
              </div>
            </div>

            <div class="form-group">
              <label>Password</label>
              <div class="input-group">
                <i class="bi bi-lock"></i>
                <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Enter password"
                  required />
                <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                  <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>
            </div>

            <div class="form-options">
              <label class="remember">
                <input type="checkbox" v-model="rememberMe">
                <span>Remember me</span>
              </label>
              <a href="#" class="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" class="login-btn" :disabled="loading">
              <span v-if="!loading">Sign In</span>
              <span v-else>Signing in...</span>
            </button>

            <div class="login-footer">
              <p>Need help? <a href="#">Contact support</a></p>
              <p class="version">HR System v1.0</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>




<style>

</style>