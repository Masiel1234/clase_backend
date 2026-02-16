pause
@echo off
REM Script para construir y empaquetar el frontend como .exe usando Tauri

REM 1. Ir a la carpeta del frontend
cd /d %~dp0
cd sistemaInforme-frontend

REM 2. Instalar dependencias si es necesario
if not exist node_modules (
  echo Instalando dependencias...
  npm install
) else (
  echo Dependencias ya instaladas.
)

REM 3. Generar build de producción
npm run build

REM 4. Empaquetar con Tauri
npx tauri build

REM 5. Preparar carpeta de produccion
cd /d %~dp0
if not exist produccion (
  mkdir produccion
)

REM 6. Copiar backend (sistemaInforme) a produccion
xcopy /E /I /Y sistemaInforme produccion\sistemaInforme

REM 7. Copiar ejecutable generado a produccion
set EXE_PATH=sistemaInforme-frontend\src-tauri\target\release\bundle\windows
for %%f in (%EXE_PATH%\*.exe) do copy /Y "%%f" produccion\

REM 8. Mensaje final
echo --------------------------------------
echo Todo listo en la carpeta 'produccion'.
echo Incluye el backend y el ejecutable.
echo --------------------------------------
pause