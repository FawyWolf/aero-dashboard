<template>
  <div class="weather-widget">
    <h2>🌤️ Погода</h2>
    <div v-if="data" class="weather-details">
      <div class="temp">{{ data.current?.temp }}°C</div>
      <div class="description">{{ data.current?.description }}</div>
      <div class="info">
        <p>💧 Влажность: {{ data.current?.humidity }}%</p>
        <p>💨 Ветер: {{ data.current?.windSpeed }} км/ч</p>
        <p>🌡️ Давление: {{ data.current?.pressure }} мбар</p>
      </div>
    </div>
    <div v-else>⏳ Загружаю...</div>
  </div>
</template>

<script setup>
defineProps({
  data: Object
})
</script>

<style scoped>
.weather-widget {
  padding: 1.5rem;
  border-radius: 20px;
}

.temp {
  font-size: 48px;
  font-weight: 700;
  margin: 1rem 0;
}

.description {
  font-size: 20px;
  opacity: 0.9;
  margin-bottom: 1rem;
}

.info {
  display: grid;
  gap: 0.5rem;
  font-size: 14px;
}

.info p {
  margin: 0;
}
</style>