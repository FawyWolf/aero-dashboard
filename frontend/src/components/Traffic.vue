<template>
  <div class="traffic-widget">
    <h2>🚗 Пробки</h2>
    <div v-if="data" class="traffic-info">
      <div class="traffic-level" :class="trafficClass">
        {{ data.trafficLevel }}/10
      </div>
      <p>{{ data.description }}</p>
      <div class="roads">
        <div v-for="road in data.roads" :key="road.name" class="road-item">
          <span>{{ road.name }}</span>
          <span class="level">{{ road.level }}/10</span>
        </div>
      </div>
    </div>
    <div v-else>⏳ Загружаю...</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: Object
})

const trafficClass = computed(() => {
  if (!props.data) return ''
  const level = props.data.trafficLevel
  if (level <= 2) return 'free'
  if (level <= 4) return 'light'
  if (level <= 6) return 'medium'
  if (level <= 8) return 'heavy'
  return 'critical'
})
</script>

<style scoped>
.traffic-widget {
  padding: 1.5rem;
}

.traffic-level {
  font-size: 32px;
  font-weight: 700;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 1rem;
}

.traffic-level.free { background: rgba(76, 175, 80, 0.3); color: #4caf50; }
.traffic-level.light { background: rgba(255, 193, 7, 0.3); color: #ffc107; }
.traffic-level.medium { background: rgba(255, 152, 0, 0.3); color: #ff9800; }
.traffic-level.heavy { background: rgba(244, 67, 54, 0.3); color: #f44336; }
.traffic-level.critical { background: rgba(153, 0, 0, 0.3); color: #990000; }

.roads {
  display: grid;
  gap: 0.5rem;
  margin-top: 1rem;
}

.road-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 14px;
}

.level {
  font-weight: 600;
}
</style>