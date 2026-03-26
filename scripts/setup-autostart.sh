#!/bin/bash

echo "⚙️ Настройка автозапуска Aero Dashboard..."

# Создаём .desktop файл для LXDE (для лёгких Linux дистрибутивов)
mkdir -p ~/.config/autostart

cat > ~/.config/autostart/aero-dashboard.desktop << EOF
[Desktop Entry]
Type=Application
Name=Aero Dashboard
Comment=Weather & Traffic Dashboard
Exec=/home/$(whoami)/aero-dashboard/scripts/start-dashboard.sh
Icon=weather-clear
Categories=Utility;
NoDisplay=false
X-GNOME-Autostart-enabled=true
EOF

chmod +x ~/.config/autostart/aero-dashboard.desktop

echo "✅ Автозапуск настроен!"
echo "🔄 Приложение будет запускаться при загрузке системы"