<?php

use Illuminate\Support\Facades\Route;
use App\Domains\Proveedor\Controllers\ProveedorController;


Route::prefix('proveedor')->group(function () {
    Route::get('/get/proveedor', [ProveedorController::class, 'index'])->name('proveedor.index');
    Route::post('/create/proveedor', [ProveedorController::class, 'store'])->name('proveedor.store');
    Route::patch('/{id}', [ProveedorController::class, 'update'])->name('proveedor.update');
});