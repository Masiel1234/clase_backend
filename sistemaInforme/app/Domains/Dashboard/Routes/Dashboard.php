<?php

use Illuminate\Support\Facades\Route;
use App\Domains\Dashboard\Controllers\DashBoardController;

Route::prefix('dashboard')->group(function () {
	// PRINCIPAL: TODO EN UNA SOLA PETICIÓN
	Route::get('resumen-completo', [DashBoardController::class, 'resumenCompleto']);

	// ENDPOINTS INDIVIDUALES (opcionales, si necesitas actualizar solo una parte)
	Route::get('counts', [DashBoardController::class, 'counts']);
	Route::get('stock-bajo', [DashBoardController::class, 'stockBajo']);
	Route::get('estadisticas-marcas', [DashBoardController::class, 'estadisticasMarcas']);
	Route::get('inventario-diario', [DashBoardController::class, 'inventarioDiario']);
	Route::get('graficos', [DashBoardController::class, 'graficos']);
	Route::get('alertas', [DashBoardController::class, 'alertas']);
});
