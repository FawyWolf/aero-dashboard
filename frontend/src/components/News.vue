<template>
  <div class="news-widget">
    <h2>📰 Новости</h2>
    <div v-if="items && items.length" class="news-list">
      <article v-for="(item, idx) in items.slice(0, 5)" :key="idx" class="news-item">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <small>{{ formatDate(item.pubDate) }}</small>
      </article>
    </div>
    <div v-else>⏳ Загружаю новости...</div>
  </div>
</template>

<script setup>
defineProps({
  items: Array
})

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('ru-RU')
}
</script>

<style scoped>
.news-widget {
  padding: 1.5rem;
}

.news-list {
  display: grid;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
}

.news-item {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.news-item h3 {
  margin: 0 0 0.5rem 0;
  font-size: 14px;
}

.news-item p {
  margin: 0 0 0.5rem 0;
  font-size: 12px;
  opacity: 0.8;
}

.news-item small {
  opacity: 0.6;
}
</style>