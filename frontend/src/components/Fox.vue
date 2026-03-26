<template>
  <div class="fox-container">
    <div class="fox-character" :class="foxMood">
      🦊
    </div>
    <p class="fox-mood-text">{{ moodText }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  weather: Object,
  traffic: Object
})

const foxMood = computed(() => {
  if (!props.weather) return 'neutral'
  
  const temp = props.weather.current?.temp || 0
  
  if (temp > 20) return 'happy'
  if (temp < 0) return 'cold'
  if (props.traffic?.trafficLevel > 7) return 'stressed'
  return 'neutral'
})

const moodText = computed(() => {
  const moods = {
    happy: '☀️ Горячо! Хочу на пляж!',
    cold: '🥶 Бррр, холодина!',
    stressed: '🚨 Ужас! Какие пробки!',
    neutral: '😊 Всё нормально'
  }
  return moods[foxMood.value]
})
</script>

<style scoped>
.fox-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.fox-character {
  font-size: 120px;
  animation: bounce 2s infinite;
}

.fox-mood-text {
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>