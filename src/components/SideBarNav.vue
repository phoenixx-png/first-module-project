
<script>

</script>




<!-- Phoenix -->
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




<!-- Zahraa -->
<style>


</style>