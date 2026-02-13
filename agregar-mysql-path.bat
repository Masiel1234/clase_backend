@echo off
REM Ejecutar como administrador
SET MYSQL_BIN=C:\Program Files\MySQL\MySQL Server 9.6\bin

REM Agrega la ruta de MySQL al PATH del sistema
setx /M PATH "%PATH%;%MYSQL_BIN%"

ECHO Ruta de MySQL agregada al PATH del sistema.
ECHO Cierra y abre la terminal para que los cambios tengan efecto.
pause
