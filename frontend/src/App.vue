<template>
  <div class="app">
    <nav class="nav">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/dike" class="nav-link">Dike Calculator</router-link>
      <router-link to="/distance" class="nav-link">Distance Calculator</router-link>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.nav {
  background-color: #2c3e50;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 8px;
}

.nav-link {
  color: white;
  text-decoration: none;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #34495e;
}
</style> 