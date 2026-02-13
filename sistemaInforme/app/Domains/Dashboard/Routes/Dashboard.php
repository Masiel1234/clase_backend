<?php

use Illuminate\Support\Facades\Route;
use App\Domains\Dashboard\Controllers\DashBoardCountsGeneralController;
use App\Domains\Dashboard\Controllers\DashBoardInvDiaBatGenericaCalculoController;
use App\Domains\Dashboard\Controllers\DashBoardInvDiaBatOriginalCalculoController;
use App\Domains\Dashboard\Controllers\DashBoardInvDiaCelCalculoController;
use App\Domains\Dashboard\Controllers\DashBoardInvDiaDisplayCalculoController;
use App\Domains\Dashboard\Controllers\DashBoardInvDiaRptosPeqCalculoController;
use App\Domains\Dashboard\Controllers\DashBoardInvDiaTactilCalculoController;
use App\Domains\Dashboard\Controllers\DashBoardInvDiaTapaBackCalculoController;
use App\Domains\Dashboard\Controllers\DashBoardInvDiaVisoresCalculoController;

Route::prefix('dashboard')->group(function () {
	Route::get('resumen', [DashBoardCountsGeneralController::class, 'resumenGeneral']);
	Route::get('bat-generica/estadisticas', [DashBoardInvDiaBatGenericaCalculoController::class, 'estadisticasGenerales']);
	Route::get('bat-generica/por-marca', [DashBoardInvDiaBatGenericaCalculoController::class, 'stockPorMarca']);
	Route::get('bat-generica/por-calidad', [DashBoardInvDiaBatGenericaCalculoController::class, 'stockPorCalidad']);
	Route::get('bat-generica/bajo-stock', [DashBoardInvDiaBatGenericaCalculoController::class, 'productosBajoStock']);
	Route::get('bat-generica/rentabilidad', [DashBoardInvDiaBatGenericaCalculoController::class, 'analisisRentabilidad']);

	Route::get('bat-original/estadisticas', [DashBoardInvDiaBatOriginalCalculoController::class, 'estadisticasGenerales']);
	Route::get('bat-original/por-marca', [DashBoardInvDiaBatOriginalCalculoController::class, 'stockPorMarca']);
	Route::get('bat-original/por-calidad', [DashBoardInvDiaBatOriginalCalculoController::class, 'stockPorCalidad']);
	Route::get('bat-original/bajo-stock', [DashBoardInvDiaBatOriginalCalculoController::class, 'productosBajoStock']);
	Route::get('bat-original/rentabilidad', [DashBoardInvDiaBatOriginalCalculoController::class, 'analisisRentabilidad']);

	Route::get('cel/estadisticas', [DashBoardInvDiaCelCalculoController::class, 'estadisticasGenerales']);
	Route::get('cel/servicios', [DashBoardInvDiaCelCalculoController::class, 'serviciosMasRealizados']);
	Route::get('cel/por-referencia', [DashBoardInvDiaCelCalculoController::class, 'celularesPorReferencia']);
	Route::get('cel/pendientes', [DashBoardInvDiaCelCalculoController::class, 'celularesPendientes']);
	Route::get('cel/rentabilidad', [DashBoardInvDiaCelCalculoController::class, 'analisisRentabilidad']);

	Route::get('display/estadisticas', [DashBoardInvDiaDisplayCalculoController::class, 'estadisticasGenerales']);
	Route::get('display/por-marca', [DashBoardInvDiaDisplayCalculoController::class, 'stockPorMarca']);
	Route::get('display/por-calidad', [DashBoardInvDiaDisplayCalculoController::class, 'stockPorCalidad']);
	Route::get('display/bajo-stock', [DashBoardInvDiaDisplayCalculoController::class, 'productosBajoStock']);
	Route::get('display/rentabilidad', [DashBoardInvDiaDisplayCalculoController::class, 'analisisRentabilidad']);

	Route::get('rptos-peq/estadisticas', [DashBoardInvDiaRptosPeqCalculoController::class, 'estadisticasGenerales']);
	Route::get('rptos-peq/por-marca', [DashBoardInvDiaRptosPeqCalculoController::class, 'repuestosPorMarca']);
	Route::get('rptos-peq/lista', [DashBoardInvDiaRptosPeqCalculoController::class, 'listaRepuestos']);

	Route::get('tactil/estadisticas', [DashBoardInvDiaTactilCalculoController::class, 'estadisticasGenerales']);
	Route::get('tactil/por-marca', [DashBoardInvDiaTactilCalculoController::class, 'stockPorMarca']);
	Route::get('tactil/por-calidad', [DashBoardInvDiaTactilCalculoController::class, 'stockPorCalidad']);
	Route::get('tactil/bajo-stock', [DashBoardInvDiaTactilCalculoController::class, 'productosBajoStock']);
	Route::get('tactil/rentabilidad', [DashBoardInvDiaTactilCalculoController::class, 'analisisRentabilidad']);

	Route::get('tapa-back/estadisticas', [DashBoardInvDiaTapaBackCalculoController::class, 'estadisticasGenerales']);
	Route::get('tapa-back/por-marca', [DashBoardInvDiaTapaBackCalculoController::class, 'stockPorMarca']);
	Route::get('tapa-back/bajo-stock', [DashBoardInvDiaTapaBackCalculoController::class, 'productosBajoStock']);
	Route::get('tapa-back/mas-vendidos', [DashBoardInvDiaTapaBackCalculoController::class, 'productosMasVendidos']);

	Route::get('visores/estadisticas', [DashBoardInvDiaVisoresCalculoController::class, 'estadisticasGenerales']);
	Route::get('visores/por-nombre', [DashBoardInvDiaVisoresCalculoController::class, 'stockPorNombre']);
	Route::get('visores/bajo-stock', [DashBoardInvDiaVisoresCalculoController::class, 'productosBajoStock']);
	Route::get('visores/mas-vendidos', [DashBoardInvDiaVisoresCalculoController::class, 'productosMasVendidos']);
});
