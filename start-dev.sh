#!/bin/bash
# start-dev.sh para Arch Linux
# Inicia backend, frontend y monta la base de datos

ROOT_DIR="$(dirname "$(realpath "$0")")"
BACKEND_PATH="$ROOT_DIR/sistemaInforme"
FRONTEND_PATH="$ROOT_DIR/sistemaInforme-frontend"
DB_PATH="$ROOT_DIR/db/esquema_actualizada.sql"

SETUP_SCRIPT="$ROOT_DIR/start-dev-setup.sh"
if [ -x "$SETUP_SCRIPT" ]; then
    "$SETUP_SCRIPT"
else
    echo "No se encontró start-dev-setup.sh o no tiene permisos de ejecución."
    echo "Ejecuta: chmod +x $SETUP_SCRIPT"
    exit 1
fi

echo "Iniciando backend..."
cd "$BACKEND_PATH"
php artisan serve &
echo "Backend iniciado en background."

echo "Iniciando frontend..."
cd "$FRONTEND_PATH"
npm run dev &
echo "Frontend iniciado en background."

echo "Iniciando tauri..."
npm run tauri:dev &
echo "Tauri iniciado en background."

wait
