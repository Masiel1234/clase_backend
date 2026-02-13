#!/bin/bash
# start-dev-setup.sh para Arch Linux
# Monta la base de datos inventario desde esquema.sql

ROOT_DIR="$(dirname "$(realpath "$0")")"
DB_PATH="$ROOT_DIR/db/esquema.sql"

if command -v mysql &> /dev/null; then
    echo "Eliminando base de datos inventario (si existe)..."
    mysql -u root --password='' -e "DROP DATABASE IF EXISTS inventario;"
    echo "Montando base de datos..."
    mysql -u root --password='' < "$DB_PATH"
    echo "Base de datos montada."
else
    echo "MySQL no está instalado. Instálalo con: sudo pacman -S mysql"
fi
