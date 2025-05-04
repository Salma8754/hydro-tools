<template>
  <div class="calculator">
    <h1>Distance Calculator</h1>
    <form @submit.prevent="handleSubmit" class="calculator-form">
      <div class="form-section">
        <h3>First Point</h3>
        <div class="form-group">
          <label for="lat1">Latitude (-90 to 90):</label>
          <input
            type="number"
            id="lat1"
            v-model="coordinates.lat1"
            required
            step="any"
            min="-90"
            max="90"
          />
        </div>
        <div class="form-group">
          <label for="lon1">Longitude (-180 to 180):</label>
          <input
            type="number"
            id="lon1"
            v-model="coordinates.lon1"
            required
            step="any"
            min="-180"
            max="180"
          />
        </div>
      </div>

      <div class="form-section">
        <h3>Second Point</h3>
        <div class="form-group">
          <label for="lat2">Latitude (-90 to 90):</label>
          <input
            type="number"
            id="lat2"
            v-model="coordinates.lat2"
            required
            step="any"
            min="-90"
            max="90"
          />
        </div>
        <div class="form-group">
          <label for="lon2">Longitude (-180 to 180):</label>
          <input
            type="number"
            id="lon2"
            v-model="coordinates.lon2"
            required
            step="any"
            min="-180"
            max="180"
          />
        </div>
      </div>

      <button type="submit">Calculate Distance</button>
    </form>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="result" class="results">
      <h2>Result</h2>
      <div class="result-item">
        <span>Distance:</span>
        <span>{{ result.distance_km.toFixed(2) }} km</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface Coordinates {
  lat1: string
  lon1: string
  lat2: string
  lon2: string
}

interface DistanceResult {
  distance_km: number
}

export default defineComponent({
  name: 'DistanceCalculator',
  setup() {
    const coordinates = ref<Coordinates>({
      lat1: '',
      lon1: '',
      lat2: '',
      lon2: ''
    })
    const result = ref<DistanceResult | null>(null)
    const error = ref('')

    const handleSubmit = async () => {
      error.value = ''
      
      try {
        const response = await fetch('http://localhost:8000/distance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lat1: parseFloat(coordinates.value.lat1),
            lon1: parseFloat(coordinates.value.lon1),
            lat2: parseFloat(coordinates.value.lat2),
            lon2: parseFloat(coordinates.value.lon2),
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.detail || 'Calculation failed')
        }

        const data = await response.json()
        result.value = data
      } catch (err) {
        error.value = 'Failed to calculate distance. Please check your coordinates.'
      }
    }

    return {
      coordinates,
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

.form-section {
  margin-bottom: 2rem;
}

.form-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
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