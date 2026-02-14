#!/bin/bash
# start-dev.sh para Arch Linux
# Inicia backend, frontend y monta la base de datos

ROOT_DIR="$(dirname "$(realpath "$0")")"
BACKEND_PATH="$ROOT_DIR/sistemaInforme"
FRONTEND_PATH="$ROOT_DIR/sistemaInforme-frontend"
DB_PATH="$ROOT_DIR/db/esquema_actualizada.sql"


# Borrar y crear base de datos limpia
echo "Eliminando base de datos inventario si existe..."
mysql -u root --password='' -e "DROP DATABASE IF EXISTS inventario;"
echo "Creando base de datos inventario..."
mysql -u root --password='' -e "CREATE DATABASE inventario CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"


echo "Ejecutando migraciones de Laravel..."
cd "$BACKEND_PATH"
php artisan migrate --force
echo "Migraciones ejecutadas."

echo "Ejecutando seeders de Laravel..."
php artisan db:seed --force
echo "Seeders ejecutados."

cd "$ROOT_DIR"


echo "Ejecutando migraciones de Laravel..."
cd "$BACKEND_PATH"
php artisan migrate --force
echo "Migraciones ejecutadas."

echo "Iniciando backend..."
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
