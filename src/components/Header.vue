<!-- Kuhle -->
<script>

</script>




<!-- Phoenix -->
<template>
  <header class="header" :class="{ 'dark-mode': darkMode }">
    <div class="header-left">
      <button class="menu-button" @click="$emit('toggle-sidebar')">
        <i class="bi bi-list"></i>
      </button>
      
      <div class="logo" @click="$router.push('/dashboard')">
        <div class="logo-icon">
          <i class="bi bi-people"></i>
        </div>
        <div class="logo-text">
          <span class="app-name">HR Portal</span>
          <span class="app-tag">Employee System</span>
        </div>
      </div>
    </div>

    <div class="header-middle">
      <div class="search-box">
        <i class="bi bi-search search-icon"></i>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Find employee or document..."
          class="search-input"
          @keyup.enter="handleSearch"
        />
        <button class="search-btn" @click="handleSearch">
          <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>

    <div class="header-right">
      <div class="datetime">
        <div class="date">{{ formattedDate }}</div>
        <div class="time">{{ time }}</div>
      </div>
      
      <button class="theme-btn" @click="toggleDarkMode" :title="darkMode ? 'Light mode' : 'Dark mode'">
        <i :class="darkMode ? 'bi bi-sun' : 'bi bi-moon'"></i>
      </button>
      
      <div class="user-menu-container">
        <button class="user-btn" @click="toggleUserMenu">
          <div class="user-avatar">
            <i class="bi bi-person-circle"></i>
          </div>
          <span class="user-name">HR User</span>
          <i class="bi bi-chevron-down user-arrow"></i>
        </button>
        
        <div v-if="showUserMenu" class="user-dropdown">
          <div class="dropdown-header">
            <div class="user-avatar-large">
              <i class="bi bi-person-circle"></i>
            </div>
            <div class="user-info">
              <div class="user-name-large">HR Manager</div>
              <div class="user-email">hr@company.com</div>
            </div>
          </div>
          
          <div class="dropdown-items">
            <a href="#" class="dropdown-item">
              <i class="bi bi-person"></i>
              <span>My Profile</span>
            </a>
            <a href="#" class="dropdown-item">
              <i class="bi bi-gear"></i>
              <span>Settings</span>
            </a>
            <a href="#" class="dropdown-item">
              <i class="bi bi-question-circle"></i>
              <span>Help</span>
            </a>
            
            <div class="dropdown-divider"></div>
            
            <button class="dropdown-item logout" @click="logout">
              <i class="bi bi-box-arrow-right"></i>
              <span>Logout</span>
            </button>
          </div>
          
          <div class="dropdown-footer">
            <span class="status">
              <i class="bi bi-circle-fill online"></i>
              Online
            </span>
            <span class="version">v1.0</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>




<!-- Zahraa -->
<style>


</style>