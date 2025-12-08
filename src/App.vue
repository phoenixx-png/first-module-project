<script>
import Header from './components/Header.vue';
import SideBarNav from './components/SideBarNav.vue';

export default {
  name: 'App',
  components: {
    SideBarNav, Header
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
 

<style>

body{
  background-color: aquamarine;
}

</style>
