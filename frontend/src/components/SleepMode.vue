<template>
  <div class="sleep-mode">
    <h1>🌙 РЕЖИМ ОЖИДАНИЯ</h1>
    <div class="sleep-content">
      <p class="big-emoji">😴</p>
      <p>Спокойной ночи!</p>
      <p>Проснёмся в {{ wakeUpTime }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  wakeUpTime: String
})
</script>

<style scoped>
.sleep-mode {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background: linear-gradient(135deg, #1a1a3e 0%, #0f0f23 100%);
}

h1 {
  font-size: 48px;
}

.sleep-content {
  text-align: center;
}

.big-emoji {
  font-size: 120px;
  margin: 0;
  animation: sleep 3s ease-in-out infinite;
}

@keyframes sleep {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>