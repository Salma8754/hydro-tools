<template>
  <div class="home">
    <h1>Welcome to HydroTools</h1>
    <div class="calculator-links">
      <router-link to="/dike" class="calculator-card">
        <h2>Dike Calculator</h2>
        <p>Calculate dike dimensions based on flow rate and slope</p>
      </router-link>
      <router-link to="/distance" class="calculator-card">
        <h2>Distance Calculator</h2>
        <p>Calculate the distance between two points on Earth</p>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home'
})
</script>

<style scoped>
.home {
  text-align: center;
}

.home h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.calculator-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.calculator-card {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  text-decoration: none;
  color: #2c3e50;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.calculator-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.calculator-card h2 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.calculator-card p {
  color: #666;
  margin: 0;
}
</style> 