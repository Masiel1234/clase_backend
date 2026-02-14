<?php

use Illuminate\Support\Facades\Route;
use App\Domains\Marca\Controllers\MarcaController;
use App\Domains\Marca\Requests\Store\StoreMarcaRequest;
use App\Domains\Marca\Requests\Update\UpdateMarcaRequest;

Route::prefix('catalogos/marcas')->group(function () {
    Route::get('/', [MarcaController::class, 'index']);
    Route::post('/', [MarcaController::class, 'store']);
    Route::put('/{id}', [MarcaController::class, 'update']);
    Route::patch('/{id}/deactivate', [MarcaController::class, 'deactivate']);
});