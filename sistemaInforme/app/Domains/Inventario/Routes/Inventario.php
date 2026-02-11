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
    Route::get('dia-bat-generica', [InvDiaBatGenericaController::class, 'index'])->name('inventario.dia-bat-generica');
    Route::get('dia-bat-original', [InvDiaBatOriginalController::class, 'index'])->name('inventario.dia-bat-original');
    Route::get('dia-cel', [InvDiaCelController::class, 'index'])->name('inventario.dia-cel');
    Route::get('dia-display', [InvDiaDisplayController::class, 'index'])->name('inventario.dia-display');
    Route::get('dia-rptos-peq', [InvDiaRptosPeqController::class, 'index'])->name('inventario.dia-rptos-peq');
    Route::get('tactil', [InvDiaTactilController::class, 'index'])->name('inventario.tactil');
    Route::get('tapa-back', [InvDiaTapaBackController::class, 'index'])->name('inventario.tapa-back');
    Route::get('dia-visores', [InvDiaVisoresController::class, 'index'])->name('inventario.dia-visores');

    Route::post('dia-bat-generica', [InvDiaBatGenericaController::class, 'store'])->name('inventario.dia-bat-generica.store');
    Route::post('dia-bat-original', [InvDiaBatOriginalController::class, 'store'])->name('inventario.dia-bat-original.store');
    Route::post('dia-cel', [InvDiaCelController::class, 'store'])->name('inventario.dia-cel.store');
    Route::post('dia-display', [InvDiaDisplayController::class, 'store'])->name('inventario.dia-display.store');
    Route::post('dia-rptos-peq', [InvDiaRptosPeqController::class, 'store'])->name('inventario.dia-rptos-peq.store');
    Route::post('tactil', [InvDiaTactilController::class, 'store'])->name('inventario.tactil.store');
    Route::post('tapa-back', [InvDiaTapaBackController::class, 'store'])->name('inventario.tapa-back.store');
    Route::post('dia-visores', [InvDiaVisoresController::class, 'store'])->name('inventario.dia-visores.store');

    Route::patch('dia-bat-generica/{id}', [InvDiaBatGenericaController::class, 'update'])->name('inventario.dia-bat-generica.update');
    Route::patch('dia-bat-original/{id}', [InvDiaBatOriginalController::class, 'update'])->name('inventario.dia-bat-original.update');
    Route::patch('dia-cel/{id}', [InvDiaCelController::class, 'update'])->name('inventario.dia-cel.update');
    Route::patch('dia-display/{id}', [InvDiaDisplayController::class, 'update'])->name('inventario.dia-display.update');
    Route::patch('dia-rptos-peq/{id}', [InvDiaRptosPeqController::class, 'update'])->name('inventario.dia-rptos-peq.update');
    Route::patch('tactil/{id}', [InvDiaTactilController::class, 'update'])->name('inventario.tactil.update');
    Route::patch('tapa-back/{id}', [InvDiaTapaBackController::class, 'update'])->name('inventario.tapa-back.update');
    Route::patch('dia-visores/{id}', [InvDiaVisoresController::class, 'update'])->name('inventario.dia-visores.update');
});



