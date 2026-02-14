
<?php

use Illuminate\Support\Facades\Route;
use App\Domains\Inventario\Controllers\InvDiaBatGenericaController;
use App\Domains\Inventario\Controllers\InvDiaBatOriginalController;
use App\Domains\Inventario\Controllers\InvDiaCelController;
use App\Domains\Inventario\Controllers\InvDiaDisplayController;
use App\Domains\Inventario\Controllers\InvDiaRptosPeqController;
use App\Domains\Inventario\Controllers\InvDiaTactilController;
use App\Domains\Inventario\Controllers\InvDiaTapaBackController;
use App\Domains\Inventario\Controllers\InvDiaVisoresController;

Route::prefix('inventario')->group(function () {
    // Baterías Genéricas
    Route::get('bat-generica', [InvDiaBatGenericaController::class, 'index']);
    Route::post('bat-generica', [InvDiaBatGenericaController::class, 'store']);
    Route::put('bat-generica/{id}', [InvDiaBatGenericaController::class, 'update']);

    // Baterías Originales
    Route::get('bat-original', [InvDiaBatOriginalController::class, 'index']);
    Route::post('bat-original', [InvDiaBatOriginalController::class, 'store']);
    Route::put('bat-original/{id}', [InvDiaBatOriginalController::class, 'update']);

    // Celulares
    Route::get('cel', [InvDiaCelController::class, 'index']);
    Route::post('cel', [InvDiaCelController::class, 'store']);
    Route::put('cel/{id}', [InvDiaCelController::class, 'update']);

    // Displays
    Route::get('display', [InvDiaDisplayController::class, 'index']);
    Route::post('display', [InvDiaDisplayController::class, 'store']);
    Route::put('display/{id}', [InvDiaDisplayController::class, 'update']);

    // Repuestos Pequeños
    Route::get('rptos-peq', [InvDiaRptosPeqController::class, 'index']);
    Route::post('rptos-peq', [InvDiaRptosPeqController::class, 'store']);
    Route::put('rptos-peq/{id}', [InvDiaRptosPeqController::class, 'update']);

    // Táctil
    Route::get('tactil', [InvDiaTactilController::class, 'index']);
    Route::post('tactil', [InvDiaTactilController::class, 'store']);
    Route::put('tactil/{id}', [InvDiaTactilController::class, 'update']);

    // Tapa Back
    Route::get('tapa-back', [InvDiaTapaBackController::class, 'index']);
    Route::post('tapa-back', [InvDiaTapaBackController::class, 'store']);
    Route::put('tapa-back/{id}', [InvDiaTapaBackController::class, 'update']);

    // Visores
    Route::get('visores', [InvDiaVisoresController::class, 'index']);
    Route::post('visores', [InvDiaVisoresController::class, 'store']);
    Route::put('visores/{id}', [InvDiaVisoresController::class, 'update']);
});



