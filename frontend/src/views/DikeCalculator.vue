<template>
  <div class="calculator">
    <h1>Dike Calculator</h1>
    <form @submit.prevent="handleSubmit" class="calculator-form">
      <div class="form-group">
        <label for="flowRate">Flow Rate:</label>
        <input
          type="number"
          id="flowRate"
          v-model="flowRate"
          required
          step="any"
        />
      </div>
      <div class="form-group">
        <label for="slope">Slope:</label>
        <input
          type="number"
          id="slope"
          v-model="slope"
          required
          step="any"
        />
      </div>
      <button type="submit">Calculate</button>
    </form>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="result" class="results">
      <h2>Results</h2>
      <div class="result-item">
        <span>Height:</span>
        <span>{{ result.height.toFixed(2) }} m</span>
      </div>
      <div class="result-item">
        <span>Width:</span>
        <span>{{ result.width.toFixed(2) }} m</span>
      </div>
      <div class="result-item">
        <span>Volume:</span>
        <span>{{ result.volume.toFixed(2) }} m³</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface DikeResult {
  height: number
  width: number
  volume: number
}

export default defineComponent({
  name: 'DikeCalculator',
  setup() {
    const flowRate = ref('')
    const slope = ref('')
    const result = ref<DikeResult | null>(null)
    const error = ref('')

    const handleSubmit = async () => {
      error.value = ''
      
      try {
        const response = await fetch('http://localhost:8000/dike', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            flow_rate: parseFloat(flowRate.value),
            slope: parseFloat(slope.value),
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.detail || 'Calculation failed')
        }

        const data = await response.json()
        result.value = data
      } catch (err) {
        error.value = 'Failed to calculate dike dimensions. Please check your inputs.'
      }
    }

    return {
      flowRate,
      slope,
      result,
      error,
      handleSubmit
    }
  }
})
</script>

<style scoped>
.calculator {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.calculator h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
}

.calculator-form {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  background-color: #2c3e50;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #34495e;
}

.error {
  color: #e74c3c;
  background-color: #fde8e8;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
}

.results {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.results h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.result-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}

.result-item:last-child {
  border-bottom: none;
}

.result-item span:first-child {
  color: #666;
}

.result-item span:last-child {
  font-weight: bold;
  color: #2c3e50;
}
</style> 