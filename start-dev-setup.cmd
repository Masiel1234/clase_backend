@echo off
REM Script para montar la base de datos MySQL en Windows
SETLOCAL
SET ROOTDIR=%~dp0
SET DBFILE=%ROOTDIR%db\esquema_actualizado.sql

REM Cambia el usuario y contraseña si es necesario
SET MYSQL_USER=root
SET MYSQL_PASS=root

REM Crear un archivo de configuración temporal para MySQL
SET MYSQL_CONFIG_FILE=%TEMP%\mysql_config.cnf
ECHO [client] > "%MYSQL_CONFIG_FILE%"
ECHO user=%MYSQL_USER% >> "%MYSQL_CONFIG_FILE%"
ECHO password=%MYSQL_PASS% >> "%MYSQL_CONFIG_FILE%"

ECHO Eliminando base de datos inventario (si existe)... 
mysql --defaults-extra-file="%MYSQL_CONFIG_FILE%" -e "DROP DATABASE IF EXISTS inventario;"
ECHO Montando base de datos...
mysql --defaults-extra-file="%MYSQL_CONFIG_FILE%" < "%DBFILE%"
ECHO Base de datos montada.


REM Ejecutar migraciones de Laravel
ECHO Ejecutando migraciones de Laravel...
cd sistemaInforme
php artisan migrate
ECHO Ejecutando seeders de Laravel...
php artisan db:seed --force
cd ..

REM Eliminar el archivo de configuración temporal
DEL "%MYSQL_CONFIG_FILE%"

ENDLOCAL
pause
