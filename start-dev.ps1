param(
    [switch]$WithFrontend
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $root "sistemaInforme"
$frontendPath = Join-Path $root "sistemaInforme-frontend"

Start-Process -FilePath "cmd.exe" -ArgumentList "/k", "cd /d `"$backendPath`" & php artisan serve"

if ($WithFrontend) {
    Start-Process -FilePath "cmd.exe" -ArgumentList "/k", "cd /d `"$frontendPath`" & npm run dev"
}

Start-Process -FilePath "cmd.exe" -ArgumentList "/k", "cd /d `"$frontendPath`" & npm run tauri:dev"

Write-Host "Listo. Backend y Tauri en marcha."
Write-Host "Nota: tauri dev ejecuta 'npm run dev' segun tauri.conf.json (beforeDevCommand)."
if ($WithFrontend) {
    Write-Host "Abriste un Vite adicional; si hay conflicto de puerto, quita -WithFrontend."
}
