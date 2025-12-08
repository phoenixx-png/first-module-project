
<script>
import Header from './components/Header.vue';
import SideBarNav from './components/SideBarNav.vue';
import Login from './components/Login.vue';

export default {
  name: 'App',
  components: {
    Header, SideBarNav, Login
  },
  data() {
    return {
      darkMode: false,
      isLoggedIn: false,
      isCollapsed: false,
    }
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    }
  }
}

</script>



<!-- Phoenix -->
<template>
  <div id="app" :class="{ 'dark-mode': darkMode }">
    <div v-if="isLoggedIn">
      <Header 
        :darkMode="darkMode" 
        @toggle-dark-mode="toggleDarkMode" 
        @logout="logout"
        @toggle-sidebar="toggleSidebar"
      />

      <div class="main-container">
        <SideBarNav :isCollapsed="isSidebarCollapsed" />
        
        <main class="main-content" :class="{ 'expanded': isSidebarCollapsed }">
          <router-view />
        </main>
      </div>
    </div>
    
    <div v-else>
      <router-view @login="login" />
    </div>
  </div>
</template>
 




<!-- Zahraa -->
<style>

</style>
