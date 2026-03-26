<template>
  <div 
    class="dashboard"
    :class="{ 'night-mode': isNightMode }"
    :style="{ '--brightness': brightness + '%' }"
  >
    <Settings 
      v-if="showSettings"
      @close="showSettings = false"
      @update="handleSettingsUpdate"
      :settings="settings"
    />

    <div v-if="!isNightMode" class="main-container">
      <header class="status-bar glass-effect">
        <h1>🦊 Aero Dashboard</h1>
        <button @click="showSettings = true">⚙️</button>
        <span>{{ currentTime }}</span>
      </header>

      <main class="dashboard-grid">
        <section class="glass-effect">
          <Fox :weather="weather" :traffic="traffic" />
        </section>
        <section class="glass-effect">
          <Weather :data="weather" />
        </section>
        <section class="glass-effect">
          <Traffic :data="traffic" />
        </section>
        <section class="glass-effect">
          <News :items="news" />
        </section>
      </main>
    </div>

    <SleepMode v-else />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Fox from './components/Fox.vue'
import Weather from './components/Weather.vue'
import Traffic from './components/Traffic.vue'
import News from './components/News.vue'
import Settings from './components/Settings.vue'
import SleepMode from './components/SleepMode.vue'

const currentTime = ref('')
const weather = ref(null)
const traffic = ref(null)
const news = ref([])
const showSettings = ref(false)
const brightness = ref(100)

const defaultSettings = {
  language: 'RU',
  region: 'spb',
  theme: 'auto',
  brightness: 100,
  soundVolume: 50,
  sleepTime: '23:00',
  wakeUpTime: '08:00',
  updateInterval: 5
}

const settings = ref({ ...defaultSettings })

const isNightMode = computed(() => {
  const now = new Date()
  const currentHour = now.getHours()
  const sleepHour = parseInt(settings.value.sleepTime.split(':')[0])
  const wakeHour = parseInt(settings.value.wakeUpTime.split(':')[0])
  return currentHour >= sleepHour || currentHour < wakeHour
})

const loadSettings = () => {
  const saved = localStorage.getItem('aero-settings')
  if (saved) settings.value = { ...defaultSettings, ...JSON.parse(saved) }
}

const saveSettings = () => {
  localStorage.setItem('aero-settings', JSON.stringify(settings.value))
}

const handleSettingsUpdate = (newSettings) => {
  settings.value = { ...settings.value, ...newSettings }
  brightness.value = settings.value.brightness
  saveSettings()
}

const fetchData = async () => {
  try {
    const [w, t, n] = await Promise.all([
      fetch(`http://localhost:3000/api/weather?city=${settings.value.region}`),
      fetch(`http://localhost:3000/api/traffic?city=${settings.value.region}`),
      fetch(`http://localhost:3000/api/news?city=${settings.value.region}`)
    ])
    if (w.ok) weather.value = await w.json()
    if (t.ok) traffic.value = await t.json()
    if (n.ok) news.value = (await n.json()).news
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

onMounted(() => {
  loadSettings()
  fetchData()
  setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }, 1000)
  setInterval(fetchData, settings.value.updateInterval * 60 * 1000)
})
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  --brightness: 100%;
  filter: brightness(var(--brightness));
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  flex: 1;
}
</style>