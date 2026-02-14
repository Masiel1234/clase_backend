<?php

use Illuminate\Support\Facades\Route;
use App\Domains\Proveedor\Controllers\ProveedorController;


Route::prefix('proveedor')->group(function () {
    Route::get('/', [ProveedorController::class, 'index']);
    Route::post('/', [ProveedorController::class, 'store']);
    Route::put('/{id}', [ProveedorController::class, 'update']);
    Route::patch('/{id}/deactivate', [ProveedorController::class, 'deactivate']);
});