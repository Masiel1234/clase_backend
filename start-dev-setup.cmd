@echo off
REM Script para montar la base de datos MySQL en Windows
SETLOCAL
SET ROOTDIR=%~dp0
SET DBFILE=%ROOTDIR%db\esquema.sql

REM Cambia el usuario y contraseña si es necesario
SET MYSQL_USER=root
SET MYSQL_PASS=

ECHO Eliminando base de datos inventario (si existe)...
mysql -u %MYSQL_USER% --password=%MYSQL_PASS% -e "DROP DATABASE IF EXISTS inventario;"
ECHO Montando base de datos...
mysql -u %MYSQL_USER% --password=%MYSQL_PASS% < "%DBFILE%"
ECHO Base de datos montada.
ENDLOCAL
