#!/bin/bash
# start-dev-setup.sh para Arch Linux
# Monta la base de datos inventario desde esquema.sql

ROOT_DIR="$(dirname "$(realpath "$0")")"
DB_PATH="$ROOT_DIR/db/esquema_actualizada.sql"

if command -v mysql &> /dev/null; then
    echo "Verificando si la base de datos inventario existe..."
    DB_EXISTS=$(mysql -u root --password='' -e "SHOW DATABASES LIKE 'inventario';" | grep inventario)
    if [ -z "$DB_EXISTS" ]; then
        echo "Montando base de datos..."
        mysql -u root --password='' < "$DB_PATH"
        echo "Base de datos montada."
    else
        echo "La base de datos inventario ya existe. No se modifica."
    fi
else
    echo "MySQL no está instalado. Instálalo con: sudo pacman -S mysql"
fi
