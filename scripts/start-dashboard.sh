#!/bin/bash

# Скрипт автозапуска для nетбука в kiosk режиме

# Ждём загрузки системы
sleep 10

# Запускаем backend
cd /home/$(whoami)/aero-dashboard/backend
pm2 start server.js --name aero-backend &

# Даём серверу время на запуск
sleep 5

# Запускаем frontend в Chromium fullscreen
chromium-browser \
  --kiosk \
  --no-first-run \
  --no-default-browser-check \
  --disable-translate \
  --disable-background-networking \
  --disable-default-apps \
  --disable-plugin-power-saver \
  --disable-preconnect \
  http://localhost:5173 &

echo "🦊 Aero Dashboard запущена!"