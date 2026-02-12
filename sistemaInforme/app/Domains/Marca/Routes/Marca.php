<?php

use Illuminate\Support\Facades\Route;
use App\Domains\Marca\Controllers\MarcaController;
use App\Domains\Marca\Requests\Store\StoreMarcaRequest;
use App\Domains\Marca\Requests\Update\UpdateMarcaRequest;

Route::prefix('marca')->group(function () {
    Route::get('/marca/get', [MarcaController::class, 'index'])->name('marca.index');
    Route::post('/marca/create', [MarcaController::class, 'store'])->name('marca.store');
    Route::patch('/{id}', [MarcaController::class, 'update'])->name('marca.update');
});