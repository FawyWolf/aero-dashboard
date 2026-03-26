#!/bin/bash

echo "🦊 Установка Aero Dashboard на Linux..."

# Обновляем систему
echo "📦 Обновляю систему..."
sudo apt update && sudo apt upgrade -y

# Устанавливаем Node.js (если его нет)
if ! command -v node &> /dev/null; then
    echo "📥 Устанавливаю Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Устанавливаем Chromium (для kiosk режима)
echo "📥 Устанавливаю Chromium..."
sudo apt install -y chromium-browser

# Переходим в папку проекта
cd "$(dirname "$0")/.."

# Устанавливаем зависимости backend
echo "📦 Установка backend зависимостей..."
cd backend
npm install
cd ..

# Устанавливаем зависимости frontend
echo "📦 Установка frontend зависимостей..."
cd frontend
npm install
npm run build
cd ..

# Устанавливаем PM2 для автозапуска
echo "🔧 Устанавливаю PM2 для автозапуска..."
sudo npm install -g pm2
pm2 startup
pm2 save

echo "✅ Установка завершена!"
echo "🚀 Для запуска используй: npm start (в backend папке)"
echo "🌐 Фронтенд будет доступен на http://localhost:5173"