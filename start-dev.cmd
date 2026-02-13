@echo off
REM Montar la base de datos antes de iniciar servicios
call "%~dp0start-dev-setup.cmd"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-dev.ps1" %*
