@echo off
REM Script para construir y empaquetar el frontend como .exe usando Tauri

REM 1. Ir a la carpeta del frontend
cd /d %~dp0
cd sistemaInforme-frontend || (echo No se encontró la carpeta sistemaInforme-frontend & pause & exit /b)


REM 2. Instalar dependencias si es necesario
if not exist node_modules (
  echo Instalando dependencias...
  call npm install || (echo Error instalando dependencias & pause & exit /b)
  echo --- npm install terminado ---
) else (
  echo Dependencias ya instaladas.
)


REM 3. Generar build de producción
echo Generando build de producción...
call npm run build || (echo Error en build de producción & pause & exit /b)
echo --- build terminado ---


REM 4. Empaquetar con Tauri
echo Empaquetando con Tauri...
call npx tauri build || (echo Error en empaquetado Tauri & pause & exit /b)
echo --- empaquetado terminado ---


REM 5. Preparar carpeta de produccion
cd /d %~dp0
if not exist produccion (
  mkdir produccion
)
echo --- carpeta produccion lista ---


REM 6. Copiar backend (sistemaInforme) a produccion
echo Copiando backend a produccion...
xcopy /E /I /Y sistemaInforme produccion\sistemaInforme >nul
echo --- backend copiado ---


REM 7. Copiar instaladores generados a produccion
set "NSIS_PATH=sistemaInforme-frontend\src-tauri\target\release\bundle\nsis"
set "MSI_PATH=sistemaInforme-frontend\src-tauri\target\release\bundle\msi"
set "EXE_FOUND=0"
for %%f in (%NSIS_PATH%\*.exe) do (
  copy /Y "%%f" produccion\
  set "EXE_FOUND=1"
)
for %%f in (%MSI_PATH%\*.msi) do (
  copy /Y "%%f" produccion\
  set "EXE_FOUND=1"
)
if "%EXE_FOUND%"=="0" echo No se encontró el instalador .exe ni .msi generado.
echo --- instaladores copiados ---

REM 8. Mensaje final
echo --------------------------------------
echo Todo listo en la carpeta 'produccion'.
echo Incluye el backend y el ejecutable.
echo --------------------------------------
pause