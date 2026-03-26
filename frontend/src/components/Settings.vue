<template>
  <div class="settings-overlay" @click="$emit('close')">
    <div class="settings-panel glass-effect" @click.stop>
      <h2>⚙️ Настройки</h2>
      
      <div class="settings-group">
        <label>🌐 Язык</label>
        <select v-model="localSettings.language" @change="emit('update', localSettings)">
          <option>RU</option>
          <option>EN</option>
          <option>MIX</option>
        </select>
      </div>

      <div class="settings-group">
        <label>📍 Город</label>
        <select v-model="localSettings.region" @change="emit('update', localSettings)">
          <option value="spb">Санкт-Петербург</option>
          <option value="msk">Москва</option>
          <option value="ekb">Екатеринбург</option>
        </select>
      </div>

      <div class="settings-group">
        <label>🎨 Тема</label>
        <select v-model="localSettings.theme" @change="emit('update', localSettings)">
          <option>auto</option>
          <option>light</option>
          <option>dark</option>
        </select>
      </div>

      <div class="settings-group">
        <label>🔆 Яркость: {{ localSettings.brightness }}%</label>
        <input 
          type="range" 
          min="10" 
          max="100" 
          v-model.number="localSettings.brightness"
          @input="emit('update', localSettings)"
        />
      </div>

      <div class="settings-group">
        <label>🔊 Громкость: {{ localSettings.soundVolume }}%</label>
        <input 
          type="range" 
          min="0" 
          max="100" 
          v-model.number="localSettings.soundVolume"
          @input="emit('update', localSettings)"
        />
      </div>

      <div class="settings-group">
        <label>🌙 Время сна</label>
        <input type="time" v-model="localSettings.sleepTime" @input="emit('update', localSettings)" />
      </div>

      <div class="settings-group">
        <label>☀️ Пробуждение</label>
        <input type="time" v-model="localSettings.wakeUpTime" @input="emit('update', localSettings)" />
      </div>

      <button class="close-btn" @click="$emit('close')">✕ Закрыть</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  settings: Object
})

const emit = defineEmits(['update', 'close'])

const localSettings = ref({ ...props.settings })

watch(() => props.settings, (newSettings) => {
  localSettings.value = { ...newSettings }
}, { deep: true })
</script>

<style scoped>
.settings-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.settings-panel {
  width: 90%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 20px;
  max-height: 90vh;
  overflow-y: auto;
}

.settings-group {
  margin-bottom: 1.5rem;
}

.settings-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.settings-group select,
.settings-group input[type="time"],
.settings-group input[type="range"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: inherit;
  font-size: 14px;
}

.close-btn {
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>